import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions/category.action';
import './style.css';

export default function MenuHeader() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategory());
    }, [])

    const { categories } = useSelector(state => state.category);
    console.log(categories);

    const randerCategories = (categories) => {
        let cat = [];
        for (let category of categories) {
            cat.push(
                <li key={cat.name}>
                    {
                        category.parentid !== "undefined" ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> : <span>{category.name}</span>
                    }
                    {
                        category.children.length > 0 ? (
                            <ul>
                                {randerCategories(category.children)}
                            </ul>
                        ) : ""
                    }
                </li>
            );
        }
        return cat;
    }


    return (
        <div className="menuheader">
            <ul>
                {
                    categories.length > 0 ?
                        randerCategories(categories) : null
                }
            </ul>
        </div>
    )
}
