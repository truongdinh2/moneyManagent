import { Input, Tooltip, InputNumber } from 'antd';
import React, { Component } from 'react';

function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class ChangeTypeMoney extends Component {

    // onChange = e => {
    //     this.props.onChanges(e.target.value)
    //     // console.log("ewwwwww",e);
    //     // const { value } = e.target;
    //     // const reg = /^-?\d*(\.\d*)?$/;
    //     // if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    //     //      this.props.onChanges(value);
    //     // }
    // };

    // onBlur = () => {
    //     const { value, onBlur, onChanges } = this.props;
    //     let valueTemp = value;
    //     if (value.charAt(value.length - 1) === '.' || value === '-') {
    //         valueTemp = value.slice(0, -1);
    //     }
    //     onChanges(valueTemp.replace(/0*(\d+)/, '$1'));
    //     if (onBlur) {
    //         onBlur();
    //     }
    // };
    handlePercentMatch = (e) => {
        const isInteger = /^[0-9]+$/;
        if (e.target.value === '' || isInteger.test(e.target.value)) {
            this.props.onChanges(e.target.value)
        }
    }
    handleTest = (e) => {
        this.props.onChanges(e)
    }
    render() {

        console.log(this.props, "data funtioon");
        const { value } = this.props;
        const title = value ? (
            <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
        ) : (
            'Input a number'
        );
        return (
            <Tooltip
                trigger={['focus']}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                {/*  <Input
                    {...this.props}
                    onChange={this.handlePercentMatch}
                    // onBlur={this.onBlur}
                    placeholder="Input a number"
                    maxLength={25}

                    addonAfter="VND"
                />
              */}
                <InputNumber
                    {...this.props}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.handleTest}
                   
                />
            </Tooltip>
        );
    }
}
export default ChangeTypeMoney


