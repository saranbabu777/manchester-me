import { Box, CircularProgress, Typography } from "@mui/material"
import useLoader from "../common/hooks/useLoader";

const Loader = ()=>{

    const { loader } = useLoader();

    return (
        <Box sx={{ display: `${loader ? 'flex' : 'none'}`, alignItems: 'center', justifyContent:'center', position: 'absolute', top: '1px', height: '100vh', width: '100%', zIndex: '9' }}>
            <CircularProgress size={70} color="inherit" />
            <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{position: 'absolute'}}
                >Loading...</Typography>
        </Box>
    )
}

export default Loader;