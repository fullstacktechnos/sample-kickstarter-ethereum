import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../etherium/factory";
import web3 from "../../etherium/web3";
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumcontribution: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault(); // dont submit the form

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      // we dont need to mention gas as metamask in browser will take care of it
      await factory.methods
        .createCampaign(this.state.minimumcontribution)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/'); // Redirect to index
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3> Create a Campaign </h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label> Minimum Contribution </label>
            <Input
              label="Wei"
              labelPosition="right"
              value={this.state.minimumcontribution}
              onChange={event =>
                this.setState({
                  minimumcontribution: event.target.value
                })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            {" "}
            Create{" "}
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
