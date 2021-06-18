import React from 'react';
import Newmodal from '../../../components/Modal';
import Input from '../../../components/Ui/Input';
import { Col, Row } from 'react-bootstrap';



const UpdateCategoriesModal = (props) => {

    const {size,show,hidemodal,onSubmit,modalTitle,expendetAray,checkedArray,handelCategoryInput,CategoryList,Parentcat} = props;

    return (
        <Newmodal
            show={show}
            handleClose={hidemodal}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
            size={size}
        >
            <h5>Expended</h5>
            {
                expendetAray.length > 0 && expendetAray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input type="text" placeholder="Enter Category name" value={item.name} name="name" onChange={(e) => handelCategoryInput(e.target.name, e.target.value, index, "expended")} label="Enter Category name" />
                        </Col>
                        <Col>
                            <label>Select the type</label>
                            <select name="parentId" label="Enter Category name" id="parentId" className="form-control" onChange={(e) => handelCategoryInput(e.target.name, e.target.value, index, "expended")} >
                                <option value="" >--Select Parent--</option>
                                {
                                    CategoryList.map((option, ind) => (
                                        <option key={ind} value={option.value} >{option.name}</option>
                                    ))
                                }
                            </select>
                        </Col>
                        <Col>
                            <label>Select Type</label>
                            <select value={item.type} className="form-control" onChange={(e) => handelCategoryInput('type',e.target.value,index,"checked")} name="type" id="type">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                ))
            }

            <h5>Checked</h5>
            {
                checkedArray.length > 0 && checkedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input type="text" placeholder="Enter Category name" value={item.name} name="name" onChange={(e) => handelCategoryInput(e.target.name, e.target.value, index, "checked")} label="Enter Category name" />
                        </Col>
                        <Col>
                            <label>Select the type</label>
                            <select name="parentId" label="Enter Category name" id="parentId" value={Parentcat} className="form-control" onChange={(e) => handelCategoryInput(e.target.name, e.target.value, index, "checked")} >
                                <option value="">--Select Parent--</option>
                                {
                                    CategoryList.map((option, ind) => (
                                        <option key={ind} value={option.value} >{option.name}</option>
                                    ))
                                }
                            </select>
                        </Col>
                        <Col>
                            <label>Select Type</label>
                            <select value={item.type} className="form-control" onChange={(e) => handelCategoryInput('type',e.target.value,index,"checked")} name="type" id="type">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                ))
            }
        </Newmodal>
    );
}



export default UpdateCategoriesModal;