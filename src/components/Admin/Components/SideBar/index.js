import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import LinkIcon from '@mui/icons-material/Link';
import SubjectIcon from '@mui/icons-material/Subject';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import CircleIcon from '@mui/icons-material/Circle';




const SideBar = ({ sidebarData }) => {

   const Navigate =  useNavigate();


    const [open, setOpen] = useState()
    const handleClick = () => {
        setOpen(!open)
    }
    const NavigateSidebar =(data)=>{
        console.log('data is is', data)

        // if(data.id == 1 && data.id == 5 && data.id == 6){
        Navigate(data?.pathName)
        // }


    }

    return (
        <>
            <Box >
                <List
                    sx={{ width: '100%', }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <>
                        {
                            sidebarData.id != 1 && sidebarData.id != 5 && sidebarData.id != 6 && sidebarData.id != 7 && sidebarData.id != 8 ?
                                <ListItemButton onClick={() => handleClick(sidebarData.id)}>
                                    <ListItemIcon >

                                        {sidebarData.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={sidebarData.name} />
                                    {  open ? <ExpandLess /> : <ExpandMore /> }
                                </ListItemButton>
                                :
                                <ListItemButton component={NavLink} to={`/${sidebarData.pathName}`}>
                                    <ListItemIcon > {sidebarData.icon}  </ListItemIcon>
                                    <ListItemText primary={sidebarData.name} />
                                </ListItemButton>
                        
                        }
                        <Collapse in={open} timeout="auto"  >
                            {sidebarData.package.map((subItems) => {
                                // console.log('subItems is', subItems)
                                return (
                                subItems.id != 1 && subItems.id != 5 && subItems.id != 6 && sidebarData.id != 7 && subItems.id != 8 ?
                                    <List component="div" disablePadding key={subItems.id}>
                                        <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems.pathName}`} >
                                            <ListItemIcon>
                                               <SubjectIcon /> 
                                            </ListItemIcon>
                                            <ListItemText primary={subItems.text} />
                                        </ListItemButton>
                                      {subItems.text2 != null ?
                                      <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems.pathName2}`} >
                                            <ListItemIcon>
                                            <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary={subItems.text2} />
                                        </ListItemButton>
                                        : null}
                                        
                               
                                    </List>
                                    : null
                                    

                             
                                )
                            })}
                        </Collapse>
                    </>
                </List>
            </Box>
        </>
    );

}
export default SideBar;