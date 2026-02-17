import { Part } from './Part'

const Content = ({ part1, part2, part3 }) => {
  return (
    <>
      <Part name={part1.name} numberOfExercise={part1.exercises} />
      <Part name={part2.name} numberOfExercise={part2.exercises} />
      <Part name={part3.name} numberOfExercise={part3.exercises} />
    </>
  )
}

export default Content
