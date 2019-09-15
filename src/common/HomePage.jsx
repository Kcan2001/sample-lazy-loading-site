import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import * as V from 'victory';

import play from './play.png';
import pause from './pause.png';
import video from './norway.mp4';

import Card from './Card.jsx';

const HomePage = (props) => {
    const [employees, setEmployees] = useState();
    const [employeeCount, setEmployeeCount] = useState(10);
    const [playIcon, setplayIcon] = useState(true);

    const vidRef = useRef();

    const handleVideoButton = () => {
        if (playIcon) {
            vidRef.current.play();
            setplayIcon(false)
        } else {
            vidRef.current.pause();
            setplayIcon(true)
        }
    }

    useEffect(() => {
        async function getEmployees() {
            try {
              const response = await axios.get('http://dummy.restapiexample.com/api/v1/employees');
              setEmployees(response);
            } catch (error) {
              console.error(error);
            }
          };

          getEmployees();

      }, []);

      if (!employees) {
          return null;
      }

      // If you want to select certain employees
      const topEmployees = employees.data.slice(0, employeeCount);
      const loadMoreEmployees = () => {
        setEmployeeCount(employeeCount + 10);
      }

      const chartData = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
      ];

    return (
        <React.Fragment>
            <div style={{height: '78px', width: '100%', backgroundColor: 'black', position: 'absolute', top: '0'}}>
                <p style={{paddingLeft: '20px', paddingTop: '20px', color: 'white', margin: '0', fontWeight: 'bold', fontSize: '28px'}}>
                    [ Developing ] Customer Journeys
                </p>
            </div>
            <div style={{height: '140px'}}/>
        
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <video preload="none" controls style={{width: '70%', height: '70%'}} ref={vidRef} src={video} type="video/mp4"></video>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <button style={{width: '100px'}} onClick={() => handleVideoButton()}>
                <img style={{width: '50px', height: '50px', cursor: 'pointer'}} src={playIcon ? play : pause} alt=""/>
            </button>
        </div>

        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '36px'}}>
            <p>
                Sample Chart for no reason 
            </p>
            <div style={{width: '300px', height: '200px'}}>
                <V.VictoryBar
                data={chartData}
                // data accessor for x values
                x="quarter"
                // data accessor for y values
                y="earnings"
            />
            </div>
        </div>

        <div style={{display: 'flex', padding: '50px', flexWrap: 'wrap', justifyContent: 'center'}}>
            {topEmployees.map((item, index) => {
                return (
                    <Card key={index} name={item.employee_name} age={item.employee_age} salary={item.employee_salary}/> 
                );
            })
        }
        </div>

        <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '100px'}}>
            <button onClick={() => loadMoreEmployees()} style={{backgroundColor: 'aqua', color: 'white', borderRadius: '6px', border: 0, fontWeight: 'bold', height: '90px', width: '300px', cursor: 'pointer', alignItems: 'center'}}>
                LOAD MORE
            </button>
        </div>
        </React.Fragment>
        
    );
}

export default HomePage;