import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col, Card, Tabs, Tab} from "react-bootstrap";
import uris from "./uri.json";

function App() {
    const [ipfsData, setIpfsData] = useState<any[]>([]);
    const ipfsUrl = 'https://ipfs.io/ipfs/';
    const processIpfsUrl = (uri: string) => {
        return ipfsUrl + uri.substring(7, uri.length);
    }
    useEffect(() => {
        const fetchData = async () => {
            const returnData: any[] = [];
            for (const uri of uris) {
                const res = await fetch(processIpfsUrl(uri));
                const json = await res.json();
                returnData.push(json);
            }
            setIpfsData(returnData);
        };
        fetchData();
    }, []);

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
                <Row>
                    {ipfsData.map(e => (
                        <Col>
                            <Card style={{width: '18rem'}}>
                                <Card.Img variant="top" src={processIpfsUrl(e.image)}/>
                                <Card.Body>
                                    <Card.Title>{e.name}</Card.Title>
                                    <Card.Text>{e.description}</Card.Text>
                                    <Tabs>
                                        {e.attributes.map((attr: any) => (
                                            <Tab eventKey={attr.trait_type} title={attr.trait_type}>
                                                {attr.value}
                                            </Tab>
                                        ))}
                                    </Tabs>
                                    <Button variant="primary">Mint this NFT</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <h1>Your wallet:</h1>
                    <h2>tBNB balance: </h2>
                    <h2>NFT balance: </h2>
                </Row>
            </Container>
        </div>
    );
}

export default App;
