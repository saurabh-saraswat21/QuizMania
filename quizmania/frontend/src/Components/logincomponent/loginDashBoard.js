import React from 'react'
import CardItem from '../HomePageComp/CardItem';

function loginDashBoard() {
    return (
        <div>
            <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/images/img-30.png'
              text='Create Quiz'
              label='Exam Time'
              path='/createquiz'
            />
            <CardItem
              src='/images/img 31.png'
              text='Join Quiz'
              label='Be Prepared'
              path='/JoinQuiz'
            />
          </ul>
        </div>
      </div>
        </div>
    )
}

export default loginDashBoard
