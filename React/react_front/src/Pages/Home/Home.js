import GetUser2 from '../../Users/GetUser/GetUser2';
import PostUser from '../../Users/PostUser/PostUser';
import DeleteUser from '../../Users/DeleteUser/DeleteUser';
import LoginUser from '../../Users/PostUser/LoginUser';

export default function Home(){
    return(
    <>
        <GetUser2/>
        <PostUser/>
        <DeleteUser/>
        <LoginUser/>
    </>
    );
}