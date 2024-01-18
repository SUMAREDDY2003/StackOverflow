import React, {useState} from 'react'
import { useParams, Link , useNavigate, useLocation} from 'react-router-dom'
import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer';
import { useSelector ,useDispatch} from 'react-redux'
import { postAnswer } from '../../actions/questions'
import moment from 'moment';
import copy from 'copy-to-clipboard';
import { deleteQuestion } from '../../actions/questions';
import { voteQuestion} from '../../actions/questions'

const QuestionsDetails = () => {

    const {id} = useParams();
    const questionsList = useSelector(state => state.questionReducer)
    console.log(questionsList)
   
   const [Answer, setAnswer] = useState('');
   const Navigate = useNavigate();
   const dispatch = useDispatch();
   const User = useSelector((state) => (state.currentUserReducer));
   const location = useLocation();
   const url = 'http://localhost:3000/'

    const  handlePostAnswer = (e, answerLength) => {
        e.preventDefault()
        if(User === null){
            alert('Login or signup to answer a question')
            Navigate('/Auth');
        }
        else{
            if(Answer === ""){
                alert('Enter an answer before submitting')
            }
            else{
                dispatch(postAnswer({ id, noOfAnswers:answerLength +1, answerBody : Answer, userAnswered: User.result.name, userId: User.result._id}));
                setAnswer("");
            }
        }
   };

   const handleShare = () => {
     copy(url + location.pathname)
     alert('Copied url : '+url+location.pathname)
   }

     const handleDelete = () =>{
        dispatch(deleteQuestion(id, Navigate))
     }

    //  const handleUpVote = () => {
    //     dispatch(voteQuestion(id, 'upvote', User.result._id))
    //  }
    //  const handleDownVote = () =>{
    //     dispatch(voteQuestion(id,'downVote', User.result._id))
    //  }
    const handleUpVote = () => {
        if (User === null) {
          alert("Login or Signup to up vote a question");
          Navigate("/Auth");
        } else {
          dispatch(voteQuestion(id, "upVote"));
        }
      };
    
      const handleDownVote = () => {
        if (User === null) {
          alert("Login or Signup to down vote a question");
          Navigate("/Auth");
        } else {
          dispatch(voteQuestion(id, "downVote"));
        }
      };
//     console.log(id)
//     var questionList = [{
//         _id:'1',
//         upVotes:3,
//         downVotes:0,
//         noOfAnswers:2,
//         questionTitle:"What is function",
//         questionBody:"It meant to be",
//         questionTags:["java","c","react js", "python"],
//         userPosted:"suma",
//         userId:1,
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
//         _id:'2',
//         votes:10,
//         upVotes:3,
//         downVotes:0,
//         noOfAnswers:0,
//         questionTitle:"What is function",
//         questionBody:"It meant to be",
//         questionTags:["java","c","react js", "python"],
//         userPosted:"suma",
//         askedOn:"jan 10",
//         userId:1,
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
//         _id:'3',
//         votes:10,
//         upVotes:3,
//         downVotes:0,
//         noOfAnswers:7,
//         questionTitle:"What is function",
//         questionBody:"It meant to be",
//         questionTags:["java","c","react js", "python"],
//         userPosted:"suma",
//         askedOn:"jan 10",
//         usedId:1,
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

  return (
    <div className='question-details-page'> 
      {
        questionsList?.data === null ?
        <h1>Loading...</h1>:
        <>
           {
            questionsList.data?.filter(question => question._id === id)?.map((question) => (
                <div key={question._id}>
                 {console.log(question)}
                    <section className='question-details-container'>
                       <h1>{question.questionTitle}</h1>
                        <div className='question-details-container-2'>
                            <div className='question-votes'>
                                <img src={ upvote } alt="" width='18' className='votes-icon' onClick={handleUpVote}/>
                                <p>{question.upVote.length - question.downVote.length}</p>
                                <img src={ downvote } alt="" width='18' className='votes-icon' onClick={handleDownVote}/>
                            </div>
                            <div style={{width:"100%" }}>
                                <p className='question-body'>{question.questionBody}</p>
                                <div className='question-details-tags'>
                                    {
                                        question.questionTags?.map((tag) => (
                                            <p key={tag}>{tag}</p>
                                        ))
                                    }

                                </div>
                                <div className='question-actions-user'>
                                    <div>
                                        <button type='button' onClick={handleShare}>Share</button>
                                        {
                                            User?.result?._id === question?.userId && (
                                                <button type='button' onClick={handleDelete}>Delete</button>
                                            )
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>asked {moment(question.askedOn).fromNow()}</p>
                                        <Link to={`/User/${question.usedId}`} className='user-link' style={{color:'#0086d8'}}>
                                            <Avatar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                            <div>
                                                {question.userPosted}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {
                        question.noOfAnswers !== 0 && (
                            <section>
                                <h3>{question.noOfAnswers} answers </h3>
                              <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                            </section>
                        )
                    }
                    <section className='post-ans-container'>
                        <h3>Your Answer</h3>
                        <form onSubmit={ (e) => {handlePostAnswer(e, question.answer.length);}}>
                            <textarea name='' id='' rows='10' cols='30' value={Answer} onChange={(e) => setAnswer(e.target.value) }></textarea><br/>
                           <input type='submit' className='post-ans-btn' value='Post Your Answer'/>
                        </form>
                        <p>
                          Browse other Question tagged 
                          {
                            question.questionTags?.map((tag) => (
                              <Link to='/Tags' key={tag} className='ans-tag'> {tag} </Link>
                            ))
                          } or 
                          <Link to='/AskQuestion' style={{textDecoration:"none" ,color:"#009dff"}}>ask your own question</Link>
                        </p>
                    </section>
               </div>
            ))
           }
        </>
      }
    </div>
  )

    }
export default QuestionsDetails;
