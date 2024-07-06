import React, { useState } from 'react';
export default function App() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [yearMsg, setYearMsg] = useState('Must be a valid year');
  const [errors, setErrors] = useState({ day: true, month: true, year: true });
  const [dayResult, setDayResult] = useState('--')
  const [monthResult, setMonthResult] = useState('--');
  const [yearResult, setYearResult] = useState('--');

  function handleOnChangeInput(event) {
    const { id, value } = event.target;
    switch (id) {
      case 'day':
        setDay(value);
        setErrors(e => ({ ...e, day: isDay(value) }))
        break;
      case 'month':
        setMonth(value);
        setErrors(e => ({ ...e, month: isMonth(value) }))
        break;
      case 'year':
        setYear(value);
        setErrors(e => ({ ...e, year: isYear(value) }))
        break;
    }
  }
  function isDay(value) {
    return !isNaN(Number(value)) && (Number(value) <= 31 && Number(value) > 0)
      || value === '';
  }
  function isMonth(value) {
    return !isNaN(Number(value)) && (Number(value) <= 12 && Number(value) > 0)
      || value === '';

  }
  function isYear(value) {
    if (Number(value) > new Date().getFullYear()) {
      setYearMsg('Must be in the past')
    }
    else {
      setYearMsg('Must be a valid year')
    }
    return !isNaN(Number(value)) && (Number(value) <= (new Date().getFullYear()) && Number(value) > 0)
      || value === ''
      ;
  }
  function calculateAge() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const birthYear = Number(year);
    const birthMonth = Number(month);
    const birthDay = Number(day);

    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
      const prevMonthDays = new Date(prevYear, prevMonth, 0).getDate();
      days += prevMonthDays;
      months--;
    }

    setDayResult(days);
    setMonthResult(months);
    setYearResult(years);
  }

  return (
    <div className="font-poppins container w-80 h-[490px] md:h-[680px] md:w-[840px] bg-white rounded-3xl rounded-br-[7rem] py-14">
      <div
        className="w-72 md:w-[730px] mx-auto flex gap-9 h-24">

        <div className='flex flex-col md:gap-3 w-[85px] md:w-[155px] md:h-32'>
          <label htmlFor="day"
            className={`uppercase text-sm font-bold tracking-[5px] ${errors.day ? 'text-[#716f6f]' : 'text-[#ff5757]'}`}>
            day
          </label>
          <input
            type="text" name="day" id="day"
            className={`border-2 w-full h-14 md:h-16  px-3 text-xl md:text-2xl font-extrabold rounded-xl outline-none ${errors.day ? 'border-[#dbdbdb]' : 'border-[#ff5757]'}`}
            value={day}
            placeholder="DD" onChange={handleOnChangeInput}
            maxLength={2}
          />
          <i className={`text-[#ff5757] text-[7px] md:text-[12px]  font-light ${errors.day ? 'hidden' : ''}`}>Must be a valid day</i>
        </div>

        <div className='flex flex-col md:gap-3 w-[85px] md:w-[155px] md:h-32'>
          <label htmlFor="month"
            className={`uppercase text-sm font-bold tracking-[5px] ${errors.month ? 'text-[#716f6f]' : 'text-[#ff5757]'}`}>
            month
          </label>
          <input
            type="text" name="month" id="month"
            className={`border-2 w-full h-14 md:h-16  px-3 text-xl font-extrabold rounded-xl outline-none ${errors.month ? 'border-[#dbdbdb]' : 'border-[#ff5757]'}`}
            value={month}
            placeholder="MM" onChange={handleOnChangeInput}
            maxLength={2} />
          <i className={`text-[#ff5757] text-[7px] md:text-[12px] font-light ${errors.month ? 'hidden' : ''}`}>Must be a valid month</i>

        </div>

        <div className='flex flex-col md:gap-3 w-[85px] md:w-[155px] md:h-32'>
          <label htmlFor="year"
            className={`uppercase text-sm font-bold tracking-[5px] ${errors.year ? 'text-[#716f6f]' : 'text-[#ff5757]'}`}>
            year
          </label>
          <input
            type="text" name="year" id="year"
            className={`border-2 w-full h-14 md:h-16  px-3 text-xl font-extrabold rounded-xl outline-none ${errors.year ? 'border-[#dbdbdb]' : 'border-[#ff5757]'}`}
            value={year}
            placeholder="YYYY" onChange={handleOnChangeInput}
            maxLength={4}
          />
          <i className={`text-[#ff5757] text-[7px] md:text-[12px] font-light ${errors.year ? 'hidden' : ''}`}>{yearMsg}</i>

        </div>
      </div>

      <div className="relative w-72 md:w-[730px] mx-auto flex justify-center md:justify-end mt-3 mb-8">
        <button onClick={calculateAge}
          className='bg-[#854dff] h-16 md:h-24 w-16 md:w-24 flex justify-center items-center rounded-full z-20 cursor-pointer'>
          <img src="./assets/images/icon-arrow.svg" alt="" />
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" strokeWidth="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" /></g></svg>
        </button>
        <hr className='border-[#dbdbdb] w-full absolute top-1/2 z-10' />
      </div>

      <div className='w-72 md:w-[730px] mx-auto'>
        <p className='text-5xl md:text-8xl italic font-extrabold leading-snug'><span className='text-[#854dff]'>{yearResult}</span> years</p>
        <p className='text-5xl md:text-8xl italic font-extrabold leading-snug'><span className='text-[#854dff]'>{monthResult}</span> months</p>
        <p className='text-5xl md:text-8xl italic font-extrabold leading-snug'><span className='text-[#854dff]'>{dayResult}</span> days</p>
      </div>

      {/*  */}
      {/*  */}
      {/* <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="#">Your Name Here</a>.
      </footer> */}
    </div>
  )
}
