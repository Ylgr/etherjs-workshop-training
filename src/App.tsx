import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col} from "react-bootstrap";
import uri from "./uri.json";
import { createHelia } from 'helia';
function App() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            // create a Helia node
            const helia = await createHelia();

            // get data from IPFS
            const cid = 'Qmf6jZezmLcHrUdvrGkNmas9XFWBHQnHu9ABqRD1gWB4yF';
            for await (const file of helia.get(cid)) {
                if (!file.content) continue;
                console.log(file.content.toString());
            }
        };
        fetchData();
    }, []);

    return <div>{data}</div>;


  return (
    <div className="App">
      <Container>
          <Row>
              <Col>
                  <Button>Connect wallet</Button>
              </Col>
          </Row>
          <Row>
              <h1>Lazy mint NFT</h1>
          </Row>
          {uri.map(e => (<Row>
              <h3>{e}</h3>
          </Row>))}
      </Container>
    </div>
  );
}

export default App;
