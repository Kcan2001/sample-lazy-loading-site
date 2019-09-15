import React from 'react';
import icon from './icon.png';

const Card = (props) => {

    const formatSalary = (salary) => {
        return (
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              }).format(salary)
        )
    }

return (
    <div style={{border: '1px solid grey', margin: '16px', width: '28%', height: '400px', borderRadius: '16px'}}>
        <div style ={{backgroundColor: 'aqua', borderRadius: '16px 16px 0 0', height: '140px'}}>
            <p style={{textAlign: 'center', fontSize: '28px', fontWeight: 'bold', margin: '0', paddingTop: '28px'}}>
                {props.name}
            </p>
        </div>
    <div style={{display: 'flex', justifyContent: 'center', width: '100%', height: '18%'}}>
        <img style={{height: '136px', width:'136px', position: 'relative', borderRadius: '50%', bottom: '60px', zIndex: '1', backgroundColor: 'white'}} src={icon} alt=""/>
    </div>

    <div style={{padding: '26px'}}>
            <p style={{fontWeight: 'bold', textDecoration: 'underline', marginBottom: 0}}>
                Age:
            </p>
            <p style={{marginTop: 0}}>
                {props.age}
            </p>
            <p style={{fontWeight: 'bold', textDecoration: 'underline', marginBottom: 0}}>
                salary:
            </p>
            <p style={{marginTop: 0}}>
                {formatSalary(props.salary)}
            </p>
    </div>
    </div>
);
};

export default Card;