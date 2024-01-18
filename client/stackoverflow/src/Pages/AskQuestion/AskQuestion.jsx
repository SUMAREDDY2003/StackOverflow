import React,{useState} from 'react'
import './AskQuestion.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { askQuestion } from '../../actions/questions';

const AskQuestion = () => {
   
const [questionTitle , setQuestionTitle] = useState('');
const [questionBody , setQuestionBody] = useState('');
const [questionTags , setQuestionTags] = useState('');

const dispatch = useDispatch();
const User = useSelector((state) => (state.currentUserReducer))
const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
       // console.log({ questionTitle, questionBody, questionTags})
       dispatch(askQuestion({ questionTitle, questionBody,questionTags, userPosted: User.result.name, userId : User?.result?._id }, navigate))
    }

    const handleEnter =(e) => {
        if(e.key === "Enter"){
            setQuestionBody(questionBody + "\n")
        }
    }

  return (
    <div className='ask-question'>
        <div className='ask-ques-container'>
            <h1>Ask a public Question</h1>

            <form onSubmit={handleSubmit}>
                <div className='ask-form-container'>
                    <label htmlFor='ask-ques-title'>
                        <h4>Title</h4>
                        <p>Be specific and imagine you're asking a question to another person</p>
                        <input type='text name='questionTitle id='ask-ques-title' onChange={(e)=>{setQuestionTitle(e.target.value)}} placeholder='is there an R funtion for finding the index of an element in a vector'/>
                    </label>
                    <label htmlFor='ask-ques-body'>
                        <h4>Body</h4>
                        <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
                        <textarea name="" id="ask-ques-body" cols="30" onChange={(e)=>{setQuestionBody(e.target.value)}} rows="10" onKeyPress={handleEnter}></textarea>
                    </label>
                    <label htmlFor='ask-ques-tags'>
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type='text name='questionTitle id='ask-ques-tags'onChange={(e)=>{setQuestionTags(e.target.value.split(" "))}} placeholder='e.g. (xml typescript jav)' />
                    </label>
                </div>
                <input type="submit"  value="Review your Question" className='review-btn'/>
            </form>
        </div>
    </div>
  )
}

export default AskQuestion
