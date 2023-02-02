import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "./displayData.css"
import axios from "axios"
import Pagination from './pagination'
function DisplayData() {
    let [fetchedData, setFetchedData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const getData = () => {
        axios.get(`https://fakestoreapi.com/products`).
            then((data) => {
                console.log(data.data)
                setFetchedData(data.data)
            })
    };
    useEffect(() => {
        getData()
    }, []);


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = fetchedData.slice(firstPostIndex, lastPostIndex);
    return (
        <div id='parent-container'>
            <h1>Available Products</h1>
            <div id='main-container'>
                {currentPosts.map((data, index) => {
                    return <div id="container" key={index}>

                        <div className='img-box'>
                            <img className='images' src={data.image} alt="" />
                        </div>

                        <div className='discription'>
                            <p><b>Discription:</b>{data.description}</p>
                        </div>
                    </div>
                })
                }
            </div>
            <Pagination totalPosts={fetchedData.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>

        </div>
    )
}

export default DisplayData
