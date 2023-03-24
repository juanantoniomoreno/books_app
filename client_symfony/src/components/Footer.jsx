import React from 'react'
import { Face, Insta, Linke, Twit } from '../utils/utils'

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='socialIcons'>
        
        <a 
          href='https://www.linkedin.com/in/juan-antonio-moreno-fernandez/' 
          target="_blank" 
          rel='noreferrer'
          >
            <div>
              <Linke/>
            </div>
        </a>

        <a 
          href='https://www.facebook.com/juanantonio.morenofernandez.5' 
          target="_blank" 
          rel='noreferrer'
          >
            <div>
              <Face/>
            </div>
        </a>

        <a 
          href='https://www.instagram.com/juayto/' 
          target="_blank" 
          rel='noreferrer'
          >
            <div>
              <Insta/>
            </div>
        </a>

        <a 
          href="https://twitter.com/juayto1981" 
          target='_blank' 
          rel='noreferrer'
          >
            <span>
              <Twit size={64}/>
            </span>
        </a>
        
      </div>
      <p 
        className='text-center pb-2' 
        style={{margin: '0'}}
        >©Juan Antonio Moreno Fernández | All Rights Reserved | 2023
      </p>
    </div>
  )
}
