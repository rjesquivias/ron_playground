var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const port = 80

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    scalar Date

    type Notification {
        info: String!
    }

    type User {
        name: String!
        status: String!
    }

    type DashboardCard {
        name: String!
        amount: Int!
    }

    type Appointment {
        appointmentId: ID!
        fileNumber: Int!
        date: Date!
        signingTime: String!
        signingStatus: String!
        confirmationStatus: String!
        state: String!
        partyType: String!
        parties: [String!]!
        notaryName: String!
        users: [User!]!
        notifications: [Notification!]
    }

    type RootQuery {
        usersOnline: [User!]
        dashboardCards: [DashboardCard!]!
        appointments: [Appointment!]
    }

    type RootMutation {
        updateSigningStatus(appointmentId: ID!, status: String!): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

// The root providers a resolver function for each API endpoint
var root = {
    usersOnline: () => {
        return [
            {name: "RJ Esquivias", status: "online"},
            {name: "Yohan Jhung", status: "offline"},
            {name: "Emmanuel Pottipadu", status: "online"},
            {name: "Aamir Hakim", status: "offline"},
            {name: "Wendi Turner", status: "online"},
            {name: "Wayne Smith", status: "offline"},
        ];
    },
    dashboardCards: () => {
        return [
            {name: "Signings @ Risk", amount: 6},
            {name: "Overdue Closings", amount: 2},
            {name: "Pending Docs", amount: 4},
            {name: "New Order", amount: 11},
            {name: "New Notifications", amount: 4},
            {name: "In Process", amount: 79},
        ]
    },
    appointments: () => {
        return [
            {
                appointmentId: "a7fa9sd73hfas34",
                fileNumber: 9384773,
                date: 192384,
                signingTime: "9:30 AM",
                signingStatus: "Pending Docs",
                confirmationStatus: "Needs to be called",
                state: "MN",
                partyType: "Seller",
                parties: ["Shaun Whittier", "Tracy Anderson"],
                notaryName: "Amman Simon",
                users: [{name: "Inna Antony", status: "online"}],
                notifications: [{
                    info: "notification info"
                }],
            },
        ];
    },
    updateSigningStatus: (args) => {
        var {appointmentId, status} = args
        return `${appointmentId}, ${status}`;
    },
};

var app = express();

app.get('/', (req, res) => {
    res.send('Health Check OK!')
  })

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Running a GraphQL API server at /internal on port ${port}`);
});