import React, { useState, useEffect } from 'react';
import Button from "./components/Button/index.jsx";
import Header from "./components/Header/index.js";
import Input from "./components/Input/index.js";
import Typography from "./components/Typography/index.js";
import Tooltip from "./components/Tooltip/index.js";
import Accordion from "./components/Accordion/index.js";
import "./index.css";

function App() {
    const [cryptocurrencies, setCryptocurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = () => {
        setLoading(true);
        setError(null);
        fetch('https://api.coinlore.net/api/tickers/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setCryptocurrencies(data.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateClick = (event) => {
        event.preventDefault();
        fetchData();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredCryptocurrencies = cryptocurrencies.filter((crypto) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            crypto.name.toLowerCase().includes(lowerCaseQuery) ||
            crypto.symbol.toLowerCase().includes(lowerCaseQuery)
        );
    });

    return (
        <div id="appFinalRoot">
            <Header level="1">Cryptocurrency Prices</Header>
            <form onSubmit={(e) => e.preventDefault()}>
                <Button type="button" variant="bordered" onClick={handleUpdateClick}>Update</Button>
            </form>
            <Input 
                placeholder="Search" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {filteredCryptocurrencies.map((crypto) => {
                const percentChangeClass = parseFloat(crypto.percent_change_24h) < 0 ? 'negative' : 'positive';

                return (
                    <Accordion key={crypto.id} title={crypto.name}>
                        <Typography textSize="md">
                            <Tooltip text="The symbol of the cryptocurrency" position="top">
                                <b>Symbol: </b>{crypto.symbol}
                            </Tooltip>
                        </Typography>
                        <Typography textSize="md">
                            <Tooltip text="The price in USD" position="top">
                                <b>Price USD: </b>{crypto.price_usd}
                            </Tooltip>
                        </Typography>
                        <Typography textSize="md">
                            <Tooltip text="The price in BTC" position="top">
                                <b>Price BTC: </b>{crypto.price_btc}
                            </Tooltip>
                        </Typography>
                        <Typography textSize="md">
                            <Tooltip text="Market Cap in USD" position="top">
                                <b>Market Cap USD: </b>{crypto.market_cap_usd}
                            </Tooltip>
                        </Typography>
                        <Typography textSize="md">
                            <Tooltip text="Percent change in the last 24 hours" position="top">
                                <b>Percent Change 24H: </b>
                                <span className={percentChangeClass}>
                                    {crypto.percent_change_24h}%
                                </span>
                            </Tooltip>
                        </Typography>
                    </Accordion>
                );
            })}
        </div>
    );
}

export default App;
