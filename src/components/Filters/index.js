import './index.css'

const Filters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    locationsList,
    updateEmployee,
    updateSalary,
    updateSelectedLocations,
  } = props

  const renderEmploymentType = () => (
    <ul className="EmployeeTypeList">
      {employmentTypesList.map(type => (
        <li className="employmentTypeItem" key={type.employmentTypeId}>
          <input
            type="checkbox"
            value={type.employmentTypeId}
            id={type.employmentTypeId}
            onChange={e => updateEmployee(e.target.value)}
          />
          <label className="label" htmlFor={type.employmentTypeId}>
            {type.label}
          </label>
        </li>
      ))}
    </ul>
  )

  const renderSalaryRange = () => (
    <ul className="salaryList">
      {salaryRangesList.map(salary => (
        <li className="salaryListItem" key={salary.salaryRangeId}>
          <input
            type="radio"
            value={salary.salaryRangeId}
            name="salary"
            id={salary.salaryRangeId}
            onChange={e => updateSalary(e.target.value)}
          />
          <label htmlFor={salary.salaryRangeId} className="label">
            {salary.label}
          </label>
        </li>
      ))}
    </ul>
  )

  const renderLocation = () => (
    <ul className="salaryList">
      {locationsList.map(location => (
        <li key={location.locationId} className="salaryListItem">
          <input
            type="checkbox"
            id={location.locationId}
            value={location.locationId}
            onChange={e => updateSelectedLocations(e.target.value)}
          />
          <label className="label" htmlFor={location.locationId}>
            {location.label}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="filters-container">
      <h1 className="employmentHeading">Type of Employment</h1>
      {renderEmploymentType()}
      <hr />
      <h1 className="employmentHeading">Salary Range</h1>
      {renderSalaryRange()}
      <hr />
      <h1 className="employmentHeading">Location</h1>
      {renderLocation()}
    </div>
  )
}

export default Filters
