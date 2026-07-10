import Header from './components/header'

import Content from './components/Content'

import Total from './components/Total'


const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      { id: 1, name: 'Fundamentals of React', exercises: 10 },
      { id: 2, name: 'Using props to pass data', exercises: 7 },
      { id: 3, name: 'State of a component', exercises: 14 },
    ],
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      { id: 1, name: 'Routing', exercises: 3 },
      { id: 2, name: 'Middlewares', exercises: 7 },
    
    ],
  },
]

const App = () => {
  return (
  <div>
    {courses.map((course) => (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
)

}

export default App
