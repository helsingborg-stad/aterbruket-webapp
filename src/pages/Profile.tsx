import API, { GraphQLResult } from '@aws-amplify/api';
import { Auth, graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { GetAdvertisementQuery, ListAdvertisementsQuery } from '../API';
import { getAdvertisement } from '../graphql/queries';

export default function Profile() {

    const [user, setUser] = useState({name: 'NAME', email: 'email@example.com', 'phone': "0725112233", adddress: "Street 1", postalcode:"12345" }) as any;
    const [adverts, setAdverts] = useState([]) as any;
    
    const InformationFrame = styled.header`
        padding: 24px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), #FFFFFF;
        border-radius: 4.5px;
    `;

    const InformationHeader = styled.p`
        text-transform: uppercase;
        color: #0069B4;
    `;


    const InformationContainer = styled.p`
        width: 100vw;
        height: 100vh;
        padding:0px 8px;
        background: #FCFCFC;
    `;


    const fetchCreatedAdverts = async () => {
        const result = (await API.graphql(
            graphqlOperation(getAdvertisement, { giver: '' })
        )) as GraphQLResult<ListAdvertisementsQuery>;
        const advertItem = result.data?.listAdvertisements;
        setAdverts(advertItem);
    };

    

    //Fetch and replace placeholder 
    useEffect(() => {
        Auth.currentAuthenticatedUser().then((authenticatedUser) => {
            setUser(authenticatedUser.attributes);
        })
        fetchCreatedAdverts();
    }, [])

    const userInfo = [];

    for (let key in user) {
        userInfo.push(
            <div>
                <InformationHeader>{key}</InformationHeader>
                <InformationFrame>{user[key]}</InformationFrame>
            </div>   
        )
    }

    return (
        <main>
            <h1> {user.name} </h1>
            <InformationContainer>
                <h3> Kontakt </h3>
                {userInfo}
            </InformationContainer>
        </main>
    )
}
