import {Grid, Paper, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {styled} from "@mui/material/styles";
import "./styles.css";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginBottom: 10,
    color: "white",
}));
export default function ({children}: any) {
    return (
        <div>
            <div className="App">
                <Grid container spacing={2}>
                    <Grid xs={12} md={4} item={true} style={{padding: 30}} className={"menu"}>
                        <Stack>
                            <Link to={"/idle_page"}>
                                <Item className={"menuLink"}>
                                    Home Page
                                </Item>
                            </Link>
                            <Link to={"/idle_page/square"}>
                                <Item className={"menuLink"}>
                                    Generating Square
                                </Item>
                            </Link>
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={8} item={true}>
                        {children}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}