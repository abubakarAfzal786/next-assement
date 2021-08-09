import React, { useState, useEffect } from 'react' //import react and some hooks
import axios from 'axios' //import axios to send requests to api
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // fontawesome icon base component
import { faSearch } from '@fortawesome/free-solid-svg-icons' // fontawesome icon

export const getStaticProps = async () => { // async function to get data from api. this function runs before the rendering of page. you can say it is kind of hook in next js
    console.log("zeeshan")
    const BASE_URL = 'https://www.zippia.com/api/jobs/'; // base url of the API
    const Options = {
        body: { // payload for the request
            "companySkills": true,
            "dismissedListingHashes": [],
            "fetchJobDesc": true,
            "jobTitle": "Business Analyst",
            "locations": [],
            "numJobs": 20,
            "previousListingHashes": []
        },
        headers: { // headers for request
            "Content-Type": "application/json"
        }
    }
    const response = await axios({ // async call through axios
        method: "post",
        url: BASE_URL,
        data: Options.body,
        headers: Options.headers,
    })

    const jobs = response.data;
    return { // sending data to the page via props
        props: {
            data: jobs,
        }
    }
}
export default function Jobs({ data }) { // Jobs component
    const [Alljobs, setAllJobs] = useState(data.jobs) // using state to keep the whole array at one place so that i dont need to call API again and again for further process
    const [searchTerms, setsearchTerms] = useState("") // Search box keeping state hook
    const [jobs, setJobs] = useState([]) // jobs to display on the page
    const [showJobs, setshowJobs] = useState([]) // jobs to display on the page
    const [page, setPage] = useState(0) // page to display the jobs
    useEffect(() => { // use Effect to set jobs in the jobs state.
        setJobs(data.jobs.slice(0, 10))
    }, [data.jobs])
    const DateChecker = (passingDate) => { // function that checks the date of posting the job is within the period of 7 days including today or not.
        var date = new Date(passingDate);
        var today = new Date();
        if ((new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)) > date) {
            return false // date is not within last 7 days, including today
        } else {
            return true // date is within last 7 days, including today
        }

    }
    const ShowRecent = () => { // function to show all the recent jobs posted, it takes whole array as set of jobs
        setshowJobs([])
        let jobs = []
        Alljobs.map((job, index) => {
            if (DateChecker(job.OBJpostingDate)) {
                jobs = [...jobs, job]
            }
        })
        setshowJobs(jobs)
    }
    const changeHandler = (e) => { // function to observe changes in the input ,
        setsearchTerms(e.target.value) // set value of input in state
    }
    const submitSearch = (e) => { // submit form function
        e.preventDefault() // stops the normal behavior of form, (stops refreshing the page)
        let j = []
        if (searchTerms) {
            setJobs([])
            Alljobs.map((job) => {
                if (job.companyName.toLowerCase().includes(searchTerms.toLowerCase())) { // checks if the item's company name property contains part of search term
                    j.push(job)
                }
            })
            setJobs(j) // set jobs state
        }
    }

    const changePagination = (e, value) => {
        e.preventDefault()
        setPage(value)
        setJobs(Alljobs.slice((10 * value), (((10 * value)) + 10) - 1))
    }
    const clearSelection = () => {
        setJobs(data.jobs.slice(0, 10))
    }
    const jobsArraytoLoopOn = showJobs.length > 10 ? showJobs : Alljobs
    return (
        <div className="container">
            <div className={!jobs.length ? "d-flex justify-content-between" : 'd-none'} onClick={clearSelection} role="status">
                no Jobs found against this criteria.
                <button className="btn my-bg-primary"><i className="fa fa-times text-white"></i></button>
            </div>
            <div className={jobs.length ? "row justify-content-around w-100" : "d-none"}>
                <div className="col-md-8">
                    <div className="row mb-4">
                        <div className="col-sm-12 col-md-6">
                            <form className="d-flex justify-content-start" onSubmit={submitSearch}>
                                <div className="search-box">
                                    <button className="btn-search"><i className="fa fa-search" onClick={submitSearch} /></button>
                                    <input type="text" name="search" className="input-search" placeholder="Search by Company Name" onChange={changeHandler} />

                                </div>
                            </form>
                        </div>
                        <div className="col-sm-12 col-md-6 d-flex justify-content-end">
                            <button className="btn my-bg-primary text-white" onClick={ShowRecent}>Recently Published Jobs</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            {jobs.map((item) => {
                                return (
                                    <div key={item.listingHash} className="card mb-3">
                                        <div className="card-body">
                                            <div className="row g-0">
                                                <div className="col-md-7 text-start">
                                                    <h5 className="card-title my-primary pointer">{item.jobTitle}</h5>
                                                </div>
                                                <div className="col-md-5 text-end">
                                                    <p className="text-muted ">{item.companyName}</p>
                                                </div>
                                            </div>
                                            <p className="card-text">{item.shortDesc}</p>
                                            <p className="card-text"><small className="text-muted">{item.OBJcity},{item.OBJstate}</small></p>
                                        </div>

                                    </div>
                                )
                            })}
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    {Array.from(Array(jobsArraytoLoopOn.length / 10).keys()).map(iter => {
                                        return (
                                            <li key={iter + "item"} className={page === iter ? "page-item disabled" : "page-item"}>
                                                <a className="page-link" onClick={(e) => { changePagination(e, iter) }} href="#">{iter + 1}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}