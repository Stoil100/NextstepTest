import React from 'react'
import { Link,useParams } from 'react-router-dom'
import Card from '../../UI/Cards/Card'
import styles from './CourseItem.module.css'

const CourseItem=(props)=>{
    const params=useParams();

    console.log(params)
    return(
        <Card className={styles.courseHolder}>
            <Link to={"/entryTest"}>take the begginer test</Link>
        </Card>
    )
}
export default CourseItem;