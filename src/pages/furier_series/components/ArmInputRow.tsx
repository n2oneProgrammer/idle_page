import {ArmElement} from "../scripts/FurierSeriesAlgorithm";
import {Grid, TextField} from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export interface IArmInputRow {
    data: ArmElement,
    onChange: (data: ArmElement) => void;
    deleteFunc: () => void;
}

function ArmInputRow({data, onChange, deleteFunc}: IArmInputRow) {
    return (
        <Grid container spacing={2} style={{marginTop: 10}}>
            <Grid item xs={4}><TextField type={"number"} defaultValue={data.angle} label={"Start Angle"}
                                         onChange={(v) => onChange(Object.assign(data, {angle: parseInt(v.target.value) || 0}))}/></Grid>
            <Grid item xs={4}><TextField type={"number"} defaultValue={data.speed} label={"Speed"}
                                         onChange={(v) => onChange(Object.assign(data, {speed: parseInt(v.target.value) || 0}))}/></Grid>
            <Grid item xs={3}><TextField type={"number"} defaultValue={data.radius} label={"radius"}
                                         onChange={(v) => onChange(Object.assign(data, {radius: parseInt(v.target.value) || 0}))}/></Grid>
            <Grid item xs={1} style={{textAlign: "right", padding: 20}}><DeleteIcon sx={{
                color: "white", fontSize: 40, '&:hover': {
                    color: "grey"
                }
            }} onClick={deleteFunc}/></Grid>
        </Grid>
    )
}

export default ArmInputRow;