import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";
import cloudinary from 'src/utils/cloudinary';
const { CLOUDINARY_PRESET_TRIPS } = process.env;
import { condition, createActivities, createCity, createUsers, typeSort } from "src/utils/interface"

export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        method,
        body: {
            name,
            initDate,
            endDate,
            planner,
            description,
            price,
            idPartaker,
            activitiesName,
            image,
            citiesIds
        },
        query: { wName, sort, sortBy, wActivity, wplanner, wCity, maxPrice }
    } = req;
    switch (method) {
        case 'GET':
            let orderBy: typeSort[] = [];
            let sortfrom: typeSort = {};
            /**http://192.168.0.8:3000/api/trips?sort=asc&sortBy=price&wName=na&wplanner=cl7z6as0h01100cqiw589yste&maxPrice=500&wActivity=vol*/
            let sortName: string = sortBy ? sortBy.toString().toLowerCase() : 'name';
            sortfrom[sortName] = sort ? sort.toString().toLowerCase() : 'desc';
            orderBy.push(sortfrom);
            var condition: condition = {
                where: wName ? { name: { contains: wName.toString() } } : {},
                include: {
                    planner: true,
                    tripOnUser: {
                        include: { user: true, trip: true }
                    },
                    activitiesOnTrips: {
                        include: { activity: true }
                    },
                    citiesOnTrips: {
                        include: { city: true }
                    }
                },
                orderBy
            };

            wplanner ? condition.where = { ...condition.where, planner: { is: { id: wplanner.toString() } } } : '';
            wActivity ?
                condition.where = {
                    ...condition.where,
                    activitiesOnTrips: {
                        some: {
                            activity: {
                                is: {
                                    name: {
                                        contains: wActivity.toString()
                                    }
                                }
                            }
                        }
                    }
                } : '';
            wCity ?
                condition.where = {
                    citiesOnTrips: {
                        some: {
                            city: {
                                is: {
                                    name: {
                                        contains: wCity.toString()
                                    }
                                }
                            }
                        }
                    }
                } : '';
            maxPrice ? condition.where = { ...condition.where, price: { lte: parseFloat(maxPrice.toString()) } } : '';

            try {
                const response = await prisma.trip.findMany(condition);
                return res.status(200).json(response)
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        case 'POST':
            if (
                !name ||
                !initDate ||
                !endDate ||
                !description ||
                !price ||
                !planner ||
                (idPartaker && !Array.isArray(idPartaker)) ||
                !activitiesName ||
                !Array.isArray(activitiesName) ||
                !citiesIds ||
                !Array.isArray(citiesIds)
            ) {
                return res.status(400).json({ msg: 'Missing or invalid data, try again' })
            }
            let initialDate = new Date(initDate);
            let finishDate = new Date(endDate);
            let createUsers: createUsers[] = idPartaker ? idPartaker.map((idP: string) => {
                return {
                    user: {
                        connect: {
                            id: idP.toString()
                        }
                    }
                }
            }) : [];
            let createActivities: createActivities[] = activitiesName ? activitiesName.map((nameAct: string) => {
                return {
                    activity: {
                        connect: {
                            name: nameAct
                        }
                    }
                }
            }) : [];
            let createCities: createCity[] = citiesIds ? citiesIds.map((nameCity: string) => {
                return {
                    city: {
                        connect: {
                            name: nameCity.toString()
                        }
                    }
                }
            }) : [];
            try {

                // const uploadImage = await cloudinary.uploader.upload(image,
                //     {
                //         upload_preset: CLOUDINARY_PRESET_TRIPS,
                //         public_id: `${name}-image:${Date.now()}`,
                //         allowed_formats: ['png', 'jpg', 'jpeg', 'jfif', 'gif']
                //     },
                //     function (error: any, result: any) {
                //         if (error) console.log(error);
                //         console.log(result);
                //     });

                const response = await prisma.trip.create({
                    data: {
                        name: name.toLowerCase(),
                        initDate: initialDate,
                        endDate: finishDate,
                        description: description,
                        price: price,
                        plannerId: planner,
                        image: image,//uploadImage.secure_url,
                        tripOnUser: { create: createUsers },
                        activitiesOnTrips: { create: createActivities },
                        citiesOnTrips: { create: createCities }
                    },
                    include: {
                        planner: true,
                        tripOnUser: {
                            include: { user: true, trip: true }
                        },
                        activitiesOnTrips: {
                            include: { activity: true }
                        },
                        citiesOnTrips: {
                            include: { city: true }
                        }
                    }
                });
                return res.status(201).json(response);
            } catch (error: any) {
                console.log(error);
                return res.status(500).json({ error, name, description });
            }
        /** Forma en la que se envia la informasión
             {
                "name": "Nuevo trip 08",
                "initDate": "2022-10-10",
                "endDate": "2022-12-12",
                "planner": "cl82bc4ow0091auqirz3xjdxv",
                "description": "probando agregar users y actividades",
                "price": 30.26,
                "image": "Prueba de imagen",
                "idPartaker": [
                    "cl834gov0119529qiqiew4ldtmw",
                    "cl82bc4ow0091auqirz3xjdxv"
                ],
                "activitiesName": [
                    "uno",
                    "Monte everest"
                ]
            }
        */
        default:
            res.status(400).send('Method not supported try again')
            break;
    }
}
