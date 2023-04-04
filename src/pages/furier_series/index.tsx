import {Canvas} from "../../components/canvas/Canvas";
import {useEffect, useState} from "react";
import FurierSeriesAlgorithm, {ArmElement} from "./scripts/FurierSeriesAlgorithm";
import {Box, Button} from "@mui/material";
import ArmInputRow from "./components/ArmInputRow";

function FurierSeriesPage() {

    const [arms, setArms] = useState<ArmElement[]>([{id: 1, speed: 1, radius: 2, angle: 2}]);
    useEffect(() => {
        console.log(arms)
        let f = new FurierSeriesAlgorithm(arms.map(a => Object.assign({}, a)));
        return () => f.onDestroy();
    }, [arms])
    return (
        <div className="App" style={{
            display: "grid",
            justifyItems: "center"
        }}>
            <div style={{
                position: "relative",
                width: 500,
                height: 500
            }}>
                <Canvas style={{
                    position: "absolute",
                    left: 0,
                    top: 0
                }} id="background" width={500} height={500}/>
                <Canvas style={{
                    position: "absolute",
                    left: 0,
                    top: 0
                }} id="main" width={500} height={500}/>
            </div>
            <Box>
                {arms.map((arm: ArmElement) => <ArmInputRow key={arm.id} data={arm} onChange={(d: ArmElement) => {
                    let temp = arms.map(a => {
                        if (a.id == arm.id) {
                            return d;
                        }
                        return a;
                    });
                    setArms(temp);
                }} deleteFunc={() => {
                    let temp = arms.filter(a => a.id != arm.id);
                    setArms(temp);
                }}/>)}
                <Button variant="contained" style={{width: "100%", marginTop: 30}} onClick={() => {
                    let id = arms[arms.length - 1].id;
                    let temp = [...arms, {id: id + 1, angle: 0, speed: 0, radius: 1}];
                    setArms(temp);
                }}>Add</Button>
            </Box>
        </div>
    )
}

export default FurierSeriesPage
