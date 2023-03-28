import React from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './form.css';

function FormComponent() {
    const [data, setData] = React.useState({
        id: "",
        name: "",
        age: "",
        salary: "",
        hobby: ""
    });
    const [allData, setAllData] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, [allData]);

    const getData = async () => {
        try {
            const res = await fetch("https://sheet.best/api/sheets/eb71db80-67a8-4c6c-b0b6-91e2d091c126");
            const result = await res.json();
            console.log(!result.detail);
            if (result.detail == false) setAllData(result);
        } catch (e) {
            console.log(e);
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitHandler = async e => {
        e.preventDefault();
        try {
            const res = fetch("https://sheet.best/api/sheets/eb71db80-67a8-4c6c-b0b6-91e2d091c126", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            // let post = await axios.post("https://sheet.best/api/sheets/eb71db80-67a8-4c6c-b0b6-91e2d091c126", data);
            // if (post.status === 200) {
            //     setAllData(everyData => [...everyData, ...data])
            // }
        } catch (e) {
            console.log(e);
        }

    };

    return (
        <Container fluid className="container">
            <Header as='h2'>React Google Sheets!</Header>
            <Form className="form" onSubmit={submitHandler}>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Enter your name' type="text" name="name" value={data.name} onChange={changeHandler} />
                </Form.Field>
                <Form.Field>
                    <label>Age</label>
                    <input placeholder='Enter your age' type="number" name="age" value={data.age} onChange={changeHandler} />
                </Form.Field>
                <Form.Field>
                    <label>Salary</label>
                    <input placeholder='Enter your salary' type="number" name="salary" value={data.salary} onChange={changeHandler} />
                </Form.Field>
                <Form.Field>
                    <label>Hobby</label>
                    <input placeholder='Enter your hobby' type="text" name="hobby" value={data.hobby} onChange={changeHandler} />
                </Form.Field>
                <Button color="blue" type='submit'>Submit</Button>
            </Form>

            <div>
                <ul>
                    {
                        allData.map(li => (
                            <li>{JSON.stringify(li)}</li>
                        ))
                    }
                </ul>
            </div>
        </Container>
    );
}

export default FormComponent;