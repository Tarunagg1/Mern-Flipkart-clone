import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Newmodal from '../../../components/Modal';
import Input from '../../../components/Ui/Input';

const AddCategoryModal = (props) => {
    const { show, handleClose, modalTitle, setCategoryName, CategoriesList, setParentCategory, handelCategoryImage } = props;

    return (
        <Newmodal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input type="text" onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter Category name" name="categoryname" label="Enter Category name" />
                </Col>
                <Col>
                <label htmlFor="">Select Parent category</label>
                    <select name="parent" id="parent" className="form-control" onChange={(e) => setParentCategory(e.target.value)} >
                        <option value="koij">--Select Parent--</option>
                        {
                            CategoriesList.map((option, ind) => (
                                <option key={ind} value={option.value} >{option.name}</option>
                            ))
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" className="form-control mt-3" name="categoryimg" onChange={handelCategoryImage} />

                </Col>
            </Row>
        </Newmodal>
    )
}


export default AddCategoryModal;