import React, { useEffect, useState } from "react";
import { formatMemberDate } from "../../util";
import axios from "axios";

export default function UserProfilePage({navigate}) {

    //Retrieve data from local storage
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
    //Will contain list of all Users for Admins
    const [userList, setUserList] = useState([]);


    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    })

    console.log(userInfo);
    //New Date Object
    let date;
    if (userInfo != null) {
         date = new Date(userInfo.date_created);
    }

    //Handle Log out
    const logOut = () => {
        //Delete Session locally?
        //Make request to remove user session from server
        localStorage.removeItem("sessionId");
        localStorage.removeItem("userInfo");
        //Go Back to WelcomePage
        navigate("", "WelcomePage", null);
    }
    return(
        <div className="user-profile-page">
            {userInfo ? (
                //Registered User or Admin
                <>
                    <div className="user-profile-header"> 
                        <h1>Username: {userInfo.username}</h1>
                        <h2>Role: {userInfo.role}</h2>
                        <h3>Reputation: {userInfo.reputation}</h3>
                        <h3>Member since: {formatMemberDate(date)}</h3>

                        <div className="user-profile-log-out-container">
                            <button className="user-profile-log-out" onClick={logOut}>Log Out</button>
                        </div>
                    </div>
                </>
            ) : (
                //Guest User (No Session)
                <>
                    <div className="user-profile-page-guest">Please Sign In To View Profile.</div>
                </>
            )}
        </div>
    )
}