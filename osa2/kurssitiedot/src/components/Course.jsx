const Header = ({ course }) =>
    <h2> {course} </h2>

const Content = ({ parts }) =>
    <div>
        {parts.map((part, id) => (
        <p key={id}>
        {part.name} {part.exercises}
        </p>
        ))}
        <b> Total of{' '} {parts.reduce((total, part) => total + part.exercises, 0)} exercises </b>
    </div>

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts= {course.parts} />
        </div>
    )
}

export default Course
