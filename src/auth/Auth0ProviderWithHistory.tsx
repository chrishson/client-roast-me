import { useNavigate } from "react-router-dom";
import { AppState, Auth0Provider } from "@auth0/auth0-react";

interface Auth0ProviderWithHistoryProps {
    children: JSX.Element;
}

const Auth0ProviderWithHistory = ({
    children,
}: Auth0ProviderWithHistoryProps) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string;

    const navigate = useNavigate();

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            audience={audience}
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            scope={"read:current_user update:current_user_metadata"}
            useRefreshTokens={true}
            cacheLocation={"localstorage"}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
