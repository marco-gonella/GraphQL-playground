import expressLoader from './express';
import dependenciesLoader from './dependencies';
import mongooseLoader from './mongoose';
import Logger from './logger';
// import jobsLoader from './jobs';
//We have to import at least all the events once so they can be triggered
// import './events';

export default async ({ expressApp }) => {

    Logger.info('DB loaded and connected!');
    await mongooseLoader();

    await expressLoader({ app: expressApp });

    //   const userModel = {
    //     name: 'userModel',
    //     // Notice the require syntax and the '.default'
    //     model: require('../models/user').default,
    //   };

    await dependenciesLoader({
        models: [
            // userModel,
            // salaryModel,
            // whateverModel
        ]
    });

    //   await jobsLoader({ agenda });

    //   await expressLoader({ app: expressApp });
};