import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';

function Currency() {
    const [rates, setRates] = useState({});
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("KES");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

   
    useEffect(() => {
        Axios.get(`https://api.exchangerate-api.com/v4/latest/USD`)
            .then((res) => {
                setRates(res.data.rates);
                setOptions(Object.keys(res.data.rates)); 
                convert(); 
            })
            .catch((error) => {
                console.error("Error fetching data from API:", error);
            });
    }, []);

   
    function convert() {
        if (input && rates[from] && rates[to]) {
            const rate = rates[to] / rates[from]; 
            setOutput(input * rate);
        } else {
            setOutput(0); 
        }
    }

 
    function flip() {
        const temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="App">
            <div className="heading">
                <h1>Currency Converter</h1>
            </div>
            <div className="container">
                <div className="left">
                    <h3>Amount</h3>
                    <input
                        type="number"
                        placeholder="Enter the amount"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="middle">
                    <h3>From</h3>
                    <Dropdown
                        options={options}
                        onChange={(e) => { setFrom(e.value); }}
                        value={from}
                        placeholder="From"
                    />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px" onClick={flip} />
                </div>
                <div className="right">
                    <h3>To</h3>
                    <Dropdown
                        options={options}
                        onChange={(e) => { setTo(e.value); }}
                        value={to}
                        placeholder="To"
                    />
                </div>
            </div>
            <div className="result">
                <button onClick={convert}>Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + (output ? output.toFixed(2) : "0.00") + " " + to}</p>
            </div>
        </div>
    );
}

export default Currency;
