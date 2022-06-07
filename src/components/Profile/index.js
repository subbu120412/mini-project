import Header from '../Header'
import Footer from '../Footer'
import './profile.css'

const Profile = () => (
  <div>
    <Header />
    <div className="profile-container">
      <img
        className="profile-image"
        src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
        alt="profile"
      />
      <h1 className="profile-name">Rahul</h1>
    </div>
    <Footer />
  </div>
)

export default Profile
