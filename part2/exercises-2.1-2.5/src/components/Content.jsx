import Part from './Part'

const Content = ({ course: { parts } }) => {
  return (
    <>
      {parts.map((part) => (
        <Part
          key={part.id}
          name={part.name}
          numberOfExercise={part.exercises}
        />
      ))}
    </>
  )
}

export default Content
