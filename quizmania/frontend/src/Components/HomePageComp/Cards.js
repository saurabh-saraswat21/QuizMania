import React from 'react';
import '../../stylesheets/Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
        <h1>Explore our website!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-30.png'
              text='Create Quiz'
              label='Exam Time'
              path='/createquiz'
            />
            <CardItem
              src='images/img 31.png'
              text='Join Quiz'
              label='Be Prepared'
              path='/JoinQuiz'
            />
          </ul>
        </div>
      </div>
      <h1>Some salient features about our website!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-105.jpeg'
              text='Mern Stack'
              label='Javascript Stack'
              path='/'
            />
            <CardItem
              src='images/img-101.jpg'
              text='React JS'
              label='UI'
              path='/'
            />
            <CardItem
              src='images/img-102.jpg'
              text='MongoDB'
              label='Database'
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;