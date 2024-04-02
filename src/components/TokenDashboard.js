import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import TokenManagement from './TokenManagement';
import TokenDiscovery from './TokenDiscovery';
import TokenSwapping from './TokenSwapping ';
import TokenInformation from './TokenInformation';
import TransactionHistory from './TransactionHistory';

function Sidebar({ onItemSelected }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        // Check if onItemSelected is a function before calling it
        if (typeof onItemSelected === 'function') {
            onItemSelected(index);
        } else {
            console.warn('onItemSelected prop is not a function!');
        }
    };

    const menuItems = ['Token Management', 'Token Discovery', 'Token Swapping', 'Token Information', 'Transaction History'];

    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {menuItems.map((text, index) => (
                    <ListItem
                        button
                        key={text}
                        selected={selectedIndex === index}
                        onClick={() => handleListItemClick(index)}
                    >
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

function ContentArea({ selectedIndex }) {
    switch (selectedIndex) {
        case 0:
            return <TokenManagement />;
        case 1:
            return <TokenDiscovery />;
        case 2:
            return <TokenSwapping />;
        case 3:
            return <TokenInformation />;
        case 4:
            return <TransactionHistory />;
        default:
            return null;
    }
}

function Dashboard() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleItemSelected = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar onItemSelected={handleItemSelected} />
            <ContentArea selectedIndex={selectedIndex} />
        </div>
    );
}

export default Dashboard;
