import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Col, Container, Row } from 'react-bootstrap';
import { addCategory, getAllCategory, updateCategorirs, deleteCategorirs as deleteCategoriesAction } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Newmodal from '../../components/Modal';
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowForward, IoIosArrowDown, IoIosAdd, IoIosTrash, IoIosCloud } from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import AddCategoryModal from './commonComponents/AddCategoryModal';
import UpdateCategoriesModal from './commonComponents/UpdateCategoriesModal';
import './style.css';

export default function Category() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [Parentcat, setParentCategory] = useState()
    const [categoryimg, sercategoryImage] = useState('')
    const [categoryname, setCategoryName] = useState('')
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([])
    const [expendetAray, setExpendetAray] = useState([])
    // const [updateCategory, setupdateCategory] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const { categories } = useSelector(state => state.category);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const handleClose = () => {
        var formData = new FormData();
        // if(categoryname == ""){
        //     alert("Name Is required");
        //     return
        // }
        formData.append('name', categoryname);
        formData.append('parentId', Parentcat);
        formData.append('categoryimg', categoryimg);
        dispatch(addCategory(formData));
        setParentCategory();
        setCategoryName('');
        sercategoryImage('');
        setShow(false);
    };


    const randerCategories = (categories) => {
        let cat = [];
        for (let category of categories) {
            cat.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && randerCategories(category.children),
                }
            );
        }
        return cat;
    }



    const CreateCategoryList = (categories, options = []) => {
        if (categories) {
            for (let category of categories) {
                // console.log(category);
                options.push({ value: category._id, name: category.name, parentId: category.parentid });

                if (category.children.length > 0) {
                    CreateCategoryList(category.children, options);
                }
            }
            return options
        }
    }


    const handelCategoryImage = (e) => {
        sercategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        updateCheckedAndExpendedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpendedCategories = () => {
        const categoriess = CreateCategoryList(categories);
        let checkedcontaineArray = [];
        let expendedcontaineArray = [];

        checked.length > 0 && checked.forEach((categoryid) => {
            const category = categoriess.find((category, _index) => categoryid === category.value);
            category && checkedcontaineArray.push(category);

        })

        expanded.length > 0 && expanded.forEach((categoryid) => {
            const category = categoriess.find((category, _index) => categoryid === category.value);
            category && expendedcontaineArray.push(category);
        })

        setCheckedArray(checkedcontaineArray);
        setExpendetAray(expendedcontaineArray)
    }



    const handelCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedcheckedarray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedcheckedarray)

        }
        else if (type === "expended") {
            const updatedExpendedarray = expendetAray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpendetAray(updatedExpendedarray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expendetAray.forEach((item) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append("type", item.type)
        });
        checkedArray.forEach((item) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append("type", item.type)
        });

        dispatch(updateCategorirs(form))

        setUpdateCategoryModal(false);
    }

    const deleteCategory = () => {
        updateCheckedAndExpendedCategories()
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedidsArray = checkedArray.map((item) => ({ _id: item.value }))
        const expendedidsArray = expendetAray.map((item) => ({ _id: item.value }))
        expendedidsArray.concat(checkedidsArray);

        if (checkedidsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedidsArray))
                .then((respdispatch) => {
                    if (respdispatch) {
                        setDeleteCategoryModal(false);
                        dispatch(getAllCategory())
                    }
                });
        }
    }

    const renderDeleteCategoryModal = () => {
        return (
            <Newmodal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={
                    [
                        {
                            label: 'No',
                            color: 'primary',
                            onClick: () => {
                                alert("no")
                            }
                        },
                        {
                            label: 'Yes',
                            color: 'danger',
                            onClick: deleteCategories
                        }
                    ]
                }
            >
                <h5>Expended</h5>
                {
                    expendetAray.map((item, index) => <span key={index}>|| {item.name}</span>)
                }
                <h5>Checked</h5>
                {
                    checkedArray.map((item, index) => <span key={index}>|| {item.name}</span>)
                }
            </Newmodal>
        )
    }

    return (
        <div>
            <Layout sidebar>
                <Container fluid>
                    <Row>
                        <Col md={12} className="mt-3">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>Category</h3>
                                <div className="actionbtnContainer">
                                    <label htmlFor="">Action</label>
                                    <button data-toggle="modal" onClick={handleShow} data-target="#Category"><IoIosAdd />  <span>Add</span></button>
                                    <button onClick={deleteCategory}><IoIosTrash/>  <span>Delete</span></button>
                                    <button onClick={updateCategory}><IoIosCloud/> <span>Edit</span></button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <CheckboxTree
                                    nodes={randerCategories(categories)}
                                    checked={checked}
                                    expanded={expanded}
                                    onCheck={checked => setChecked(checked)}
                                    onExpand={expanded => setExpanded(expanded)}
                                    icons={{
                                        check: <IoIosCheckbox />,
                                        uncheck: <IoIosCheckboxOutline />,
                                        halfCheck: <IoIosCheckboxOutline />,
                                        expandClose: <IoIosArrowForward />,
                                        expandOpen: <IoIosArrowDown />
                                    }}
                                />
                            </Col>

                        </Row>
                    </Container>
                </Container>
            </Layout>

            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle="Update Categories"
                size="lg"
                expendetAray={expendetAray}
                checkedArray={checkedArray}
                handelCategoryInput={handelCategoryInput}
                CategoryList={CreateCategoryList(categories)}
            />

            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                modalTitle="Add New Category"
                setCategoryName={setCategoryName}
                CategoriesList={CreateCategoryList(categories)}
                setParentCategory={setParentCategory}
                handelCategoryImage={handelCategoryImage}
                Parentcat={Parentcat}

            />
            {/* {renderUpdateCategoriesModal()} */}
            {renderDeleteCategoryModal()}
        </div>
    )
}
