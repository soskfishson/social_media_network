import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ErrorType } from '../../interfaces/interfaces';
import Error from '../../assets/Error.svg?react';
import NotFound from '../../assets/Error404.svg?react';
import { useTranslation } from 'react-i18next';
import './ErrorPage.css';

interface ErrorPageProps {
    error: ErrorType;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
    const { t } = useTranslation();

    const renderError = () => {
        switch (error) {
            case ErrorType.GENERIC:
                return (
                    <>
                        <Error />
                        <p className="error-message" data-testid="error-message">
                            {t('errors.generic')}
                        </p>
                    </>
                );
            case ErrorType.NOT_FOUND:
                return (
                    <>
                        <NotFound />
                        <p className="error-message" data-testid="error-message">
                            {t('errors.notFound')}
                        </p>
                    </>
                );
        }
    };
    return (
        <div className="error-page  page-transition-wrapper">
            <Header variant="simple" />
            <main className="error-page-container">{renderError()}</main>
            <Footer />
        </div>
    );
};

export default ErrorPage;
