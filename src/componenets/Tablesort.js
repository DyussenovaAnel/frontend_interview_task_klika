import { useEffect, useMemo , useState, React} from 'react';
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'


function Tablesort() {
    const [appState, setAppState] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const columns = useMemo(() => [ 
        {field: 'id', headerName: 'Id', width:80},
        {field: 'artist_name', headerName: 'Artist Name', width:250},
        {field: 'songname', headerName: 'Song Name', width:280},
        {field: 'genre', headerName: 'Genre', width:250},
        {field: 'publish_year', headerName: 'Year', width:120}
    ], [])

    useEffect(() => {
        const apiUrl = 'http://localhost:3001/';
        axios.get(apiUrl).then((resp) => {
            const allPersons = resp.data.songs;
            setAppState(allPersons);
        });
    }, [setAppState]);

    return (
        <Box
        sx={{
            height: 400, 
            width: '70%',
            m: 3,
            alignItems:"center"
        }}>
          <Typography
          variant='h5'
          component = 'h5'
          sx = {{textAlign:'center', mt:3, mb:3}}
          >
            Songs List
            </Typography>  
            <DataGrid 
            columns = { columns }
            rows = { appState }
            getRowId = {row=>row.id}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            />
        </Box>
    );
}
    
export default Tablesort;
  