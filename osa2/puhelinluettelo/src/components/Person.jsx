const Person = ({ person, deleteperson}) => {
    return (
      <p>{person.name} {person.number}  
      <button onClick={() => deleteperson(person)}>delete</button>
      </p>
    )
  }


export default Person