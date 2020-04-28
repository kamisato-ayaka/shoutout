import Styled from 'styled-components'

export const Container = Styled.div`
    height: 100vh;
`
export const FormDiv = Styled(Container)`
    background: #B99B8B;
`
export const Dboard = Styled(Container)`
    margin-top: 50px;
    width: 100%;
    max-width: 502px;
    background: #fff !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`
export const P = Styled.p`
    text-align: left;
    font-family: 'Raleway';
    font-size: 12px;
    color: #575757;
`
export const Box = Styled.div`
    width: 100%;
    max-width: 421px;
    border-radius: 14px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, .16);
    text-align: center;
`
export const FormLogo = Styled.div`
    margin-top: 100px;
    margin-bottom: 35px;
    cursor: pointer;
`
export const FormGroup = Styled.div`
    margin: auto;
    margin-bottom: 35px;
    width: 243.5px;
`
export const FormTextDiv = Styled.div`
    margin-top: 65px;
    margin-bottom: 100px;
`
export const FormText = Styled(P)`
    text-align: center !important;
    cursor: pointer;
`
export const FormInvalid = Styled(P)`
    text-align: center !important;
    font-weight: 700;
    color: #BF917B !important;
    cursor: default;
`
export const BoldP = Styled.b`
    color: #BF917B !important;
`
export const ButtonDiv = Styled.div`
    margin-top: 55px;
`
export const Button = Styled.button`
    width: 243px;
    background: #BF917B;
    border-style: none;
    border-radius: 14px;
    padding: 7.5px 0;
    outline: none;
    text-transform: uppercase;
    font-family: 'Raleway';
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
`
export const Header = Styled.div`
    overflow: hidden;
    margin-bottom: 20px;
`
export const Logo = Styled.div`
    float: left
`
export const SearchDiv = Styled.div`
    display: inline-block;
    float: right;
    margin: 12px 2px;
    border: .75px solid #E6E6E6;
    border-radius: 14px;
`
export const PostDiv = Styled.div`
    overflow: hidden;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 14px;
    padding: 10px 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, .16);
    text-align: center;
`
export const ButtonPost = Styled(Button)`
    margin: 10px;
    margin-right: 23px;
    width: 85px !important;
    float: right;
    text-transform: capitalize !important; 
    cursor: pointer;
`
export const UserInfo = Styled.div`
    margin: 15px 0;
    text-align: center !important;
    font-family: 'Raleway';
    font-size: 12px;
    color: #575757;
`
export const UserGroup = Styled(PostDiv)`
`
export const UserNameInfo = Styled(P)`
    margin-top: 0 !important;
    margin-bottom: 30px !important;
    text-align: center !important;
    color: #BF917B !important;
`
export const UserLink = Styled.div`
    float: left;
    cursor: pointer;
`
export const UserText = Styled(FormText)`
    margin-top: 3px !important;
    text-transform: capitalize;
`
export const UserButton = Styled(Button)`
    margin: auto !important;
    width: 128px !important;
    display: block !important;
`
export const FollowGroup = Styled.div`
    margin: 0 12.5px;
    width: 68px;
    display: inline-block;
`
export const PostGroup = Styled.div`
    margin-top: 10px !important;
    width: 400px;
    float: right;
    word-wrap: break-word;
`
export const SocialGroup = Styled.div`
    float: right;
`
export const SocialText = Styled(P)`
    margin: 0 !important;
    padding: 0 5px;
    display: inline-block;
    font-size: 15px !important;
    color: #A7A7A7 !important;
`
export const SocialLink = Styled.div`
    display: inline-block;
    cursor: pointer;
`
export const CommentList = Styled.li`
    display: inline-block;
    width: 460px;
    list-style: none;
`
export const CommentGroup = Styled.div`
    margin-top: 10px !important;
    width: 460px;
    float: right;
    word-wrap: break-word;
`
export const CommentImg = Styled.div`
    float: left;
`
export const CommentForm = Styled.div`
    margin: 5px 0;
    width: 410px;
    float: right;
    border: .75px solid #d2d2d2;
    border-radius: 14px;
    word-wrap: break-word;
`
export const CommentUser = Styled(P)`
    display: inline-block;
    cursor: pointer;
`
export const CommentPost = Styled.div`
    width: 390px;
    float: right;
`
export const CommentText = Styled(P)`
    width: 360px;
    display: inline-block;
    word-wrap: break-word;
`
export const CommentButton = Styled.button`
    display: inline-block;
    outline: none;
    cursor: pointer;
`
export const H1 = Styled.h1`
    margin-bottom: 5px;
    text-transform: Capitalize;
    font-family: 'Raleway';
    font-size: 20px;
    font-weight: 600;
    color: #575757;
`
export const H2 = Styled.h2`  
    margin-top: 8px;
    font-family: 'Raleway';
    font-size: 15px;
    font-weight: 600;
    color: #575757;
`
export const H1User = Styled(H1)`
    margin: 0 !important;
    font-weight: 800 !important;
    color: #BF917B !important;
`
export const H2Feed = Styled(H2)`
    margin-top: 30px;
    text-align: left;
    font-weight: unset !important;
    color: #676767 !important;
    cursor: default;
`
export const H3 = Styled.h3`
    font-family: 'Raleway';
    font-size: 12px;
`