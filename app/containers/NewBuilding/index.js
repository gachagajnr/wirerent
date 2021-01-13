/**
 *
 * NewBuilding
 *
 */

import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
    ArrowLeftOutlined,
    DownOutlined,
    PlusOutlined,
    MinusOutlined,
} from '@ant-design/icons';

import {
    Button,
    message,
    Popover,
    Typography,
    Layout,
    Space,
    Divider,
} from 'antd';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { Input, Form, Select, SubmitButton } from 'formik-antd';
import Grid from '@material-ui/core/Grid';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AuthContext } from 'utils/AuthContext';
import { createBuilding } from 'containers/Buildings/actions';
import reducer from 'containers/Buildings/reducer';
import saga from 'containers/Buildings/saga';
import unitsMenu from 'menus/UnitsMenu/index';
import unitBills from 'menus/UnitBills/index';

import miscellaneousMenu from 'menus/MiscellaneousMenu/index';
import paymentOptions from 'menus/PaymentOptions/index';
import GlobalHeader from 'containers/GlobalHeader/index';

import Wizard, { Steps, Step } from 'components/Wizard/index';
import NextButton from 'components/NextButton/index';
import messages from './messages';
import makeSelectNewBuilding from './selectors';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Header, Content } = Layout;

const BuildingSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Name Too Short!')
        .required('Name is Required'),
    floors: Yup.number().required('Floor Number is Required'),
    location: Yup.string().required('Location is Required'),
    description: Yup.string().required('Describe The Premises'),
    utypes: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required('Required'), // these constraints take precedence
                quote: Yup.string().required('Required'),
                rent: Yup.string().required('Required'), // these constraints take precedence
                total: Yup.string().required('Required'), // these constraints take precedence
            }),
        )
        .required('Must have Types'), // these constraints are shown if and only if inner constraints are satisfied
    street: Yup.string().required('Street Name is Required'),
    caretakerName: Yup.string().required('Caretaker Name is Required'),
    caretakerPhone: Yup.string()
        .min(12, 'Phone Number Too Short!')
        .required('Caretaker Tel is Required'),

    // total: Yup.number().required('Total Number of Units is Required'),
    miscellaneous: Yup.string().required('Available Features Required'),
    bills: Yup.string().required('Unit Bills is Required'),
    mode: Yup.string().required('Payment Mode is Required'),
    accountNumber: Yup.number().required('Account Number is Required'),
    bank: Yup.string().required('Bank is Required'),
    accountName: Yup.string().required('Account Name is Required'),
    branch: Yup.string().required('Bank Branch is Required'),
    paydescription: Yup.string().required('Describe the payment procedure'),
});

export function NewBuilding({ doCreateBuilding }) {
    useInjectReducer({ key: 'buildings', reducer });
    useInjectSaga({ key: 'buildings', saga });
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const formData = {
        name: '',
        floors: '',
        location: '',
        description: '',
        street: '',
        caretakerName: '',
        caretakerPhone: '',
        units: '',
        total: '',
        miscellaneous: '',
        mode: '',
        accountNumber: '',
        bank: '',
        accountName: '',
        branch: '',
        paydescription: '',
        agent: user.user.organization,
    };

    function handleSubmit(values) {
        doCreateBuilding(values);
    }
    return ( <
        div >
        <
        Helmet >
        <
        title > NewBuilding < /title>{' '} <
        meta name = "description"
        content = "Description of NewBuilding" / >
        <
        /Helmet>{' '} <
        Layout >
        <
        GlobalHeader color = "#77815c"
        title = " New Building"
        // role={user.user.role}
        other = {
            []
        }
        className = "site-page-header"
        extra = {
            []
        }
        />{' '} <
        Layout className = "site-layout" >
        <
        Content style = {
            { marginTop: 55 }
        } >
        <
        Formik validationSchema = { BuildingSchema }
        initialValues = { formData }
        onSubmit = { handleSubmit } > {
            ({
                values,

                touched,
                validateForm,
                setTouched,
                submitForm,
            }) => ( <
                Wizard >
                <
                Steps >
                <
                Step > { ' ' } {
                    ({ next }) => ( <
                        >
                        <
                        Grid container spacing = { 2 } >
                        <
                        Divider orientation = "left" > Unit Types < /Divider>{' '} <
                        div style = {
                            {
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }
                        } >
                        <
                        FieldArray name = "utypes"
                        render = {
                            arrayHelpers => ( <
                                div style = {
                                    { textAlign: 'center' }
                                } > { ' ' } {
                                    values.utypes &&
                                        values.utypes.length > 0 &&
                                        values.utypes.map((friend, index) => ( <
                                            div key = { index }
                                            style = {
                                                { textAlign: 'center' }
                                            } >
                                            <
                                            Grid container spacing = { 1 } >
                                            <
                                            Grid item xs >
                                            <
                                            Select name = { `utypes.${index}.name` }
                                            placeholder = " Select Type" > {
                                                unitsMenu.menus.map(item => ( <
                                                    Option name = { `utypes.${index}.name` }
                                                    value = { item.value }
                                                    label = { item.label }
                                                    key = { item.key } >
                                                    <
                                                    div className = "demo-option-label-item" > { ' ' } { item.text } { ' ' } <
                                                    /div>{' '} < /
                                                    Option >
                                                ))
                                            } { ' ' } <
                                            /Select>{' '} < /
                                            Grid > { ' ' } <
                                            Grid item xs >
                                            <
                                            Input name = { `utypes.${index}.quote` }
                                            placeholder = " Quote Price" /
                                            >
                                            <
                                            /Grid>{' '} <
                                            Grid item xs >
                                            <
                                            Input name = { `utypes.${index}.rent` }
                                            placeholder = " Rent Amount" /
                                            >
                                            <
                                            /Grid>{' '} <
                                            Grid item xs >
                                            <
                                            Input name = { `utypes.${index}.total` }
                                            placeholder = " Total Rooms" /
                                            >
                                            <
                                            /Grid>{' '} <
                                            Grid item xs >
                                            <
                                            Button icon = { <
                                                MinusOutlined
                                                style = {
                                                    { color: 'red' }
                                                }
                                                />
                                            }
                                            onClick = {
                                                () =>
                                                arrayHelpers.remove(index)
                                            } // remove a friend from the list
                                            />{' '} <
                                            Button icon = { <
                                                PlusOutlined
                                                style = {
                                                    { color: 'green' }
                                                }
                                                />
                                            }
                                            onClick = {
                                                () =>
                                                arrayHelpers.insert(index, '')
                                            } // insert an empty string at a position
                                            />{' '} < /
                                            Grid > { ' ' } <
                                            /Grid>{' '} < /
                                            div >
                                        ))
                                } { ' ' } { /* Add a new empty item at the end of the list */ } { ' ' } <
                                div style = {
                                    { marginTop: 5 }
                                } >
                                <
                                Button type = "default"
                                icon = { <
                                    DownOutlined
                                    style = {
                                        { color: 'green' }
                                    }
                                    />
                                }
                                onClick = {
                                    () => arrayHelpers.push('')
                                } >
                                Add Room Types { ' ' } <
                                /Button>{' '} < /
                                div > { ' ' } <
                                /div>
                            )
                        }
                        />{' '} < /
                        div > { ' ' } <
                        /Grid>{' '} <
                        NextButton type = "primary"
                        // disabled={!readTerms}
                        setTouched = { setTouched }
                        validateForm = { validateForm }
                        next = { next }
                        fields = {
                            [
                                'utypes',
                                // 'floors',
                                // 'location',
                                // 'description',
                                // 'street',
                                // 'caretakerName',
                                // 'caretakerPhone',
                                // 'units',
                                // 'total',
                                // 'miscellaneous',
                            ]
                        } >
                        Next { ' ' } <
                        /NextButton>{' '} < /
                        >
                    )
                } { ' ' } <
                /Step>{' '} <
                Step > { ' ' } {
                    ({ previous, next }) => ( <
                        >
                        <
                        Grid container spacing = { 2 } >
                        <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Building Name"
                        name = "name"
                        showValidateSuccess >
                        <
                        Input name = "name"
                        placeholder = "Building Name" /
                        >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "No Of Floors"
                        name = "floors"
                        showValidateSuccess >
                        <
                        Input name = "floors"
                        placeholder = "No Of Floors" /
                        >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Location"
                        name = "location"
                        showValidateSuccess >
                        <
                        Input name = "location"
                        placeholder = "Location" / >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Street"
                        name = "street"
                        showValidateSuccess >
                        <
                        Input name = "street"
                        placeholder = "Street" / >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Caretaker Name"
                        name = "caretakerName"
                        showValidateSuccess >
                        <
                        Input name = "caretakerName"
                        placeholder = "caretaker Name" /
                        >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "CareTaker Tel "
                        name = "caretakerPhone"
                        showValidateSuccess >
                        <
                        Input name = "caretakerPhone"
                        placeholder = "CareTaker Tel"
                        addonBefore = "+254" /
                        >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 } >
                        <
                        Form.Item label = "Unit Bills"
                        name = "bills"
                        showValidateSuccess >
                        <
                        Select mode = "multiple"
                        name = "bills"
                        placeholder = "Select Unit Bills"
                        style = {
                            { width: '100%' }
                        } > {
                            unitBills.menus.map(item => ( <
                                Option name = "bills"
                                value = { item.value }
                                label = { item.label }
                                key = { item.key } >
                                <
                                div className = "demo-option-label-item" > { ' ' } { item.text } { ' ' } <
                                /div>{' '} < /
                                Option >
                            ))
                        } { ' ' } <
                        /Select>{' '} < /
                        Form.Item > { ' ' } <
                        /Grid>{' '} <
                        Grid item xs = { 12 } >
                        <
                        Form.Item label = "Features"
                        name = "miscellaneous"
                        showValidateSuccess >
                        <
                        Select mode = "multiple"
                        name = "miscellaneous"
                        placeholder = "select Features"
                        style = {
                            { width: '100%' }
                        } > {
                            miscellaneousMenu.menus.map(item => ( <
                                Option value = { item.value }
                                label = { item.label }
                                key = { item.key } >
                                <
                                div className = "demo-option-label-item" > { ' ' } { item.text } { ' ' } <
                                /div>{' '} < /
                                Option >
                            ))
                        } { ' ' } <
                        /Select>{' '} < /
                        Form.Item > { ' ' } <
                        /Grid>{' '} <
                        Grid item xs = { 12 } >
                        <
                        Form.Item label = "Physical Description"
                        name = "description"
                        showValidateSuccess >
                        <
                        Input name = "description"
                        placeholder = "Physical Description" /
                        >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        /Grid>{' '} <
                        Space direction = "vertical" >
                        <
                        Button type = "primary"
                        block icon = { < ArrowLeftOutlined / > }
                        onClick = { previous } >
                        Back { ' ' } <
                        /Button>{' '} <
                        NextButton type = "primary"
                        // disabled={!readTerms}
                        setTouched = { setTouched }
                        validateForm = { validateForm }
                        next = { next }
                        fields = {
                            [
                                'name',
                                'floors',
                                'location',
                                'description',
                                'street',
                                'caretakerName',
                                'caretakerPhone',
                                'units',
                                'total',
                                'miscellaneous',
                            ]
                        } >
                        Next { ' ' } <
                        /NextButton>{' '} < /
                        Space > { ' ' } <
                        />
                    )
                } { ' ' } <
                /Step>{' '} <
                Step > { ' ' } {
                    ({ previous, next }) => ( <
                        >
                        <
                        Grid container spacing = { 2 } >
                        <
                        Grid item xs = { 12 } >
                        <
                        Form.Item label = "Payment Mode"
                        name = "mode"
                        showValidateSuccess >
                        <
                        Select name = "mode"
                        placeholder = "Select Payment Mode"
                        style = {
                            { width: '100%' }
                        } > {
                            paymentOptions.menus.map(item => ( <
                                Option name = "mode"
                                value = { item.value }
                                label = { item.label }
                                key = { item.key } >
                                <
                                div className = "demo-option-label-item" > { ' ' } { item.text } { ' ' } <
                                /div>{' '} < /
                                Option >
                            ))
                        } { ' ' } <
                        /Select>{' '} < /
                        Form.Item > { ' ' } <
                        /Grid>{' '} <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Bank Name"
                        name = "bank"
                        showValidateSuccess >
                        <
                        Input name = "bank"
                        placeholder = "Bank Name"
                        disabled = { values.mode === 'Cash' }
                        />{' '} < /
                        Form.Item > { ' ' } <
                        /Grid>{' '} <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Account Name"
                        name = "accountName"
                        showValidateSuccess >
                        <
                        Input name = "accountName"
                        placeholder = "Account Name" /
                        >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Account Number"
                        name = "accountNumber"
                        showValidateSuccess >
                        <
                        Input name = "accountNumber"
                        placeholder = "Account Number" /
                        >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Bank Branch"
                        name = "branch"
                        showValidateSuccess >
                        <
                        Input disabled = { values.mode === 'Cash' }
                        name = "branch"
                        placeholder = "Bank Branch" /
                        >
                        <
                        /Form.Item>{' '} < /
                        Grid > { ' ' } <
                        Grid item xs = { 12 }
                        sm = { 6 } >
                        <
                        Form.Item label = "Payment Instructions"
                        name = "paydescription"
                        showValidateSuccess >
                        <
                        TextArea name = "paydescription"
                        placeholder = "Payment Instructions"
                        style = {
                            { width: '100%' }
                        }
                        rows = { 6 }
                        />{' '} < /
                        Form.Item > { ' ' } <
                        /Grid>{' '} < /
                        Grid > { ' ' } <
                        Space direction = "vertical" >
                        <
                        Button type = "primary"
                        block icon = { < ArrowLeftOutlined / > }
                        onClick = { previous } >
                        Back { ' ' } <
                        /Button>{' '} <
                        Button type = "primary"
                        // disabled={!readTerms}
                        fields = {
                            [
                                'mode',
                                'accountNumber',
                                'bank',
                                'accountName',
                                'branch',
                                'paydescription',
                            ]
                        }
                        onClick = { submitForm }
                        block >
                        Create Building { ' ' } <
                        /Button>{' '} < /
                        Space > { ' ' } <
                        />
                    )
                } { ' ' } <
                /Step>{' '} < /
                Steps > { ' ' } <
                /Wizard>
            )
        } { ' ' } <
        /Formik>{' '} < /
        Content > { ' ' } <
        /Layout>{' '} < /
        Layout > { ' ' } <
        /div>
    );
}

NewBuilding.propTypes = {
    doCreateBuilding: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    newBuilding: makeSelectNewBuilding(),
});

function mapDispatchToProps(dispatch) {
    return {
        doCreateBuilding: data => dispatch(createBuilding(data)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(NewBuilding);