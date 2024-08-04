'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
//refactor mui packages into one line
import { Box, Stack, Typography, Button, Modal, TextField, Container } from '@mui/material'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import styles from "../components/search.module.css";
import Link from 'next/link';
import { firestore } from '../lib/firebase'
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
  } from 'firebase/firestore'


  
  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'white',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }

export default function Pantry({ }) {
    //firebase implementation - inventory state management: These will manage our inventory list, modal state, and new item input respectively.
    const [inventory, setInventory] = useState([])
    const [open, setOpen] = useState(false)
    const [itemName, setItemName] = useState('')
    const [search, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [start, setEnd] = useState({
        quantity: 1
    })


  //add updating items

    //implement inventory fetching from firestore

    //This function queries the ‘inventory’ collection in Firestore and updates our local state. The `useEffect` hook ensures this runs when the component mounts.
    const updateInventory = async () => {
        const snapshot = query(collection(firestore, 'testing'))
        const docs = await getDocs(snapshot)
        const inventoryList = []
        docs.forEach((doc) => {
          inventoryList.push({ name: doc.id, ...doc.data() })
        })
        setInventory(inventoryList)
      }
      
      useEffect(() => {
        updateInventory()
      }, [])


    const handleAdd = async (item) => {
        const docRef = doc(collection(firestore, 'testing'), item)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const { quantity } = docSnap.data()
          await setDoc(docRef, { quantity: quantity + 1 })
        } else {
          console.log("Add failed")
        }
        await updateInventory()
        console.log("test")
        // setEnd((prevState) =>{
        //     const copy = {...prevState, quantity: start.quantity + 1}
        //     console.log(copy)
        //     return copy
        // })
    }

      //implement add and remove functions to update state
      const addItem = async (item) => {
        const docRef = doc(collection(firestore, 'testing'), item)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const { quantity } = docSnap.data()
          await setDoc(docRef, { quantity: quantity + 1 })
        } else {
          await setDoc(docRef, { quantity: 1 })
        }
        await updateInventory()
      }
      
     const removeItem = async (item) => {
        const docRef = doc(collection(firestore, 'testing'), item)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const { quantity } = docSnap.data()
          if (quantity === 1) {
            await deleteDoc(docRef)
          } else {
            await setDoc(docRef, { quantity: quantity - 1 })
          }
        }
        await updateInventory()
      }
      // adding modal control functions
      const handleOpen = () => setOpen(true)
      const handleClose = () => setOpen(false)

      //search function  
      const handleSearch = async (event, item) => {
        //Track the event in the console
      const value = event.target.value;
      setQuery(value);
      let len = value.length
      console.log(value, len)

      if (value && len > 2) {
        console.log("Activating search..", value)
          const filteredResults = inventory.filter(item => 
          item.name.toLowerCase().includes(value.toLowerCase())
          );
          console.log("Filtered res:",filteredResults)
          setResults(filteredResults);
      } else {
          setResults([]);
      }

      const snapshot = query(collection(firestore, 'testing'))
      const docs = await getDocs(snapshot)

      //firebase data detection
      if (docs) {
        console.log("Data detection", docs)
        } else {
        console.log("Data missing")
        }

        // await handleSearch()
      };

      //once you call the useEffect, disable console tracking - not operational
      /*
      useEffect(() => {
        handleSearch()
      }, [])
      */
      return (
        <Container>
            <Layout>
                <Head>
                    <title>Pantry Database</title>
                </Head>
                <section className={utilStyles.headingMd}>
                <Typography>
                    This is the landing page of the pantry app. See if there is an entry that already exists in the database. This website is in the testing stage, so the administrator can see and track all entries. Please be respectful in your usage of this site.
                </Typography>
                <br />
                    <Box >
                        <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                    <Box
                        width="auto"
                        minHeight="150px"
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        bgcolor={'#f0f0f0'}
                        paddingX={5}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Item
                        </Typography>
                        <Stack width="auto" height="150px" spacing={2} overflow={'auto'}>
                        <TextField
                            id="outlined-basic"
                            label="Item"
                            variant="outlined"
                            fullWidth
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => {
                            addItem(itemName)
                            setItemName('')
                            handleClose()
                            }}
                        >
                            Add
                        </Button>
                        </Stack>
                    </Box>
                    </Modal>
                    <Box border={'1px solid #333'}>
                    <Box
                    width="auto"
                    height="150px"
                    bgcolor={'#ADD8E6'} //change color
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    >
                    <Typography variant={'h5'} color={'#333'} textAlign={'center'}>
                    Inventory Items
                    </Typography>
                    </Box>
                    <Box width="auto"
                    height="100px"
                    bgcolor={'#ADD8E6'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        type="text"
                        variant="outlined"
                        value={search} 
                        onChange={handleSearch}
                        placeholder="Type here..."
                        className={styles.searchInput}
                    />
                    <Button variant="contained" onClick={handleOpen}>
                    Add New Item
                    </Button>
                    {/* the search bar will trigger the search automatically */}
                    </Box>
                    <Box bgcolor={"#FFF4E4"}>
                        {/* BASIC VERSION OF SEARCH */}
                    {/* 
                            <span>
                        <ul>
                            <p>Match Detected in Database: </p>
                        {results.map((result, index) => (
                            <li key={index}>{result.name}</li>
                        ))}
                        </ul>
                    </span>
                    */}

                    {/* INTERMEDIATE VERSION */}
                   {results.length > 0 ? (
                            <ul className={styles.results}>
                            {results.map((result, index) => (
                                <li key={index} className={styles.resultItem}>Match Registered in the Database: {result.name}</li>
                            ))}
                            </ul>
                        ) : (
                            search.length > 2 && <p>No results found. Please add an item.</p>
                        )}
                    <Stack width="auto"
                    height="150px" spacing={2} overflow={'auto'}>
                    {inventory.map(({name, quantity}) => (
                    <Box
                    /*
                    width="auto"
                    height="100px"
                    bgcolor={'#ADD8E6'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    */
                        key={name}
                        width="auto"
                        minHeight="150px"
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        bgcolor={'#f0f0f0'}
                        paddingX={5}
                    >
                        <Typography color={'#333'} >
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Typography>
                        <Typography color={'#333'} textAlign={'center'}>
                        Quantity: {quantity}
                        </Typography>
                        {/* add +/- button */}
                        <Button variant="contained" onClick={() => removeItem(name)}>
                        Remove
                        </Button>
                    </Box>
                    ))}
                    </Stack>
                    </Box>
                    </Box>
                </Box>
                </section>
            </Layout>
            </Container>
      )
}

/*
This code creates a layout for our app with the following elements:

- A modal for adding new items
- An “Add New Item” button to open the modal
- A box displaying the inventory items
- For each item, we show its name, quantity, and a “Remove” button

Explanation of the UI components:

— The outer `Box` component creates a flex container to center our content.
— The `Modal` component contains a form for adding new items. It uses the `open` state to control its visibility.
— The “Add New Item” button opens the modal when clicked.
— The main inventory display is contained in a `Box` with a border.
— We use a `Stack` component to create a scrollable list of inventory items.
— Each item is displayed in its own `Box`, showing the item name (capitalized), quantity, and a remove button.
*/


//Code-Along from: https://medium.com/@billzhangsc/building-an-inventory-management-app-with-next-js-react-and-firebase-e9647a61eb82