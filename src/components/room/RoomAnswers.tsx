import { Link } from 'react-router-dom'
import type { RoomAnswer } from '../../data/room'

export function RoomAnswers({ answers }: { answers: RoomAnswer[] }) {
  return (
    <div className="room-answers">
      <h2 className="room-answers-title">Answers</h2>
      <ul>
        {answers.map((a, i) => (
          <li key={`${a.name}-${i}`} className={`room-answer room-answer-${a.author}`}>
            <div className="room-answer-head">
              <span className="room-answer-name">{a.name}</span>
              {a.author === 'room' ? (
                <span className="room-answer-badge">Room</span>
              ) : (
                <span className="room-answer-badge community">Community</span>
              )}
              <span className="room-answer-helpful">{a.helpful} helpful</span>
            </div>
            <p>{a.text}</p>
          </li>
        ))}
      </ul>
      <p className="room-answers-note">
        Want a booking answer for your date?{' '}
        <Link to="/book">Send an enquiry</Link>.
      </p>
    </div>
  )
}
