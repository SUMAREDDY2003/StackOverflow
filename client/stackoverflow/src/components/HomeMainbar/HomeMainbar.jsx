import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import './HomeMainbar.css'
import QuestionList from './QuestionList'
import { useSelector } from 'react-redux'

const HomeMainbar = () => {
  
 const location = useLocation()
 const user = 1;
//const user =null;
 const navigate = useNavigate()

  const questionsList = useSelector(state => state.questionReducer)
  console.log(questionsList)

//     var questionList = [{
//         _id:1,
//         votes:3,
//         noOfAnswers:2,
//         questionTitle:"What is function",
//         questionBody:"It meant to be",
//         questionTag:["java","c","react js", "python"],
//         userPosted:"suma",
//         askedOn:"jan 10",
//         answer: [
//           {
//             answerBody: "Answer",
//             userAnswered: "suma",
//             answeredOn: "jan 2",
//             usedId:2,
//           }
//         ]
//     },
//     {
//         _id:2,
//         votes:10,
//         noOfAnswers:0,
//         questionTitle:"What is function",
//         questionBody:"It meant to be",
//         questionTag:["java","c","react js", "python"],
//         userPosted:"suma",
//         askedOn:"jan 10",
//         answer: [
//           {
//             answerBody: "Answer",
//             userAnswered: "suma",
//             answeredOn: "jan 2",
//             usedId:2,
//           }
//         ]
//     },
//     {
//         _id:3,
//         votes:10,
//         noOfAnswers:7,
//         questionTitle:"What is function",
//         questionBody:"It meant to be",
//         questionTag:["java","c","react js", "python"],
//         userPosted:"suma",
//         askedOn:"jan 10",
//         answer: [
//           {
//             answerBody: "Answer",
//             userAnswered: "suma",
//             answeredOn: "jan 2",
//             usedId:2,
//           }
//         ]
//     }
// ]

  const checkAuth = () => {
    if(user === null){
      alert("Login or Signup to Ask Question!!")
      navigate('/Auth')
    }
    else{
      navigate('/AskQuestion')
    }
  }

  return (
    <div className='main-bar'>
        <div className='main-bar-header'>
          {
            location.pathname === "/" ? <h1>Top Questions </h1>  :  <h1>All Questions</h1> 
          }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button> 
    </div>
        <div>
            {
                questionsList?.data === null ?
                <h1>Loading...</h1>:
                <>
                  <p>{ questionsList?.data?.length } questions</p>
                  <QuestionList questionsList={questionsList?.data}/>
                </>
            }
        </div>
    </div>
  )
}

export default HomeMainbar
