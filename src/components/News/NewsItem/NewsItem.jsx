import React from 'react'
import Card from '../../UI/Cards/Card'
import styles from './NewsItem.module.css'

const NewsItem=(props)=>{
    console.log(props)
    return(
        <Card className={styles.newsHolder}>
            <h3 className={styles.newsTitle}>{props.title}</h3>
            <p className={styles.newsDescription}>{props.description}</p>
            <a href={props.url}>Read more</a>
        </Card>
    )
}
export default NewsItem;