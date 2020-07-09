import React, { useEffect, useState } from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout' 
import Reactmarkdown from 'react-markdown'

const endpoint = 'https://lam-strapi-gatsby.herokuapp.com/faq-page';

const FaqPage = ({data}) => {
  console.log(data.strapiFaqPage.FAQ_list);
  return (
    <Layout>
      <h1 className="c-mv">FAQ</h1>
      <div className="wrapper">
        <ol>
          {data.strapiFaqPage.FAQ_list.map(faq => (
            <li key={faq.id}>
              <p className="question">{faq.question}</p>
              <p className="answer">{faq.answer}</p>
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  );
}

export default FaqPage

export const faqPageQuery = graphql`
  query faqQuery {  
    strapiFaqPage {
      FAQ_list {
        id
        question
        answer
      }
    }
  }
`;
