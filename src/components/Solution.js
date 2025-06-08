import React, { useState,useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardActions, IconButton, Tooltip, Button, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Info } from '@mui/icons-material';

import { useLocation } from "react-router-dom";

const plantDiseases = [
  {
    name: 'Powdery Mildew',
    description: 'Powdery mildew is a fungal disease that affects a wide range of plants. It is characterized by white or gray powdery spots on leaves.',
    solution: 'Remove affected leaves, increase air circulation, and use fungicides if necessary.',
    imageUrl: 'https://www.greenlife.co.ke/wp-content/uploads/2022/04/mango_powdery_mildew.jpg',
    details: 'Powdery mildew thrives in warm, dry environments and can spread rapidly if not managed. It is often seen in environments with poor air circulation. This disease can affect a wide range of plants, including fruits, vegetables, and ornamental plants. Preventative measures include proper spacing of plants, regular pruning, and using resistant varieties.'
},
{
    name: 'Blight',
    description: 'Blight is a broad term that refers to a variety of plant diseases characterized by rapid and complete chlorosis and plant death.',
    solution: 'Remove infected plants, avoid overhead watering, and use appropriate fungicides.',
    imageUrl: 'https://cdn.mos.cms.futurecdn.net/aTdWJvnG8t43BaAJkFizKY.jpg',
    details: 'Blight can be caused by various pathogens, including fungi, bacteria, and viruses. It often leads to significant crop losses if not controlled early. Different types of blight affect specific plants, such as potato blight and tomato blight. Early intervention, such as removing infected plant material and using protective fungicides, is critical.'
},
{
    name: 'Leaf Spot',
    description: 'Leaf spot is a common fungal disease that causes spots on plant leaves. These spots can vary in size, shape, and color.',
    solution: 'Remove affected leaves, apply fungicides, and ensure proper plant spacing.',
    imageUrl: 'https://nwdistrict.ifas.ufl.edu/hort/files/2012/06/cercospora_hydrangea-300x224.jpg',
    details: 'Leaf spots can be caused by various fungi and bacteria. Proper plant spacing and good air circulation can help reduce the severity of this disease. Leaf spot diseases can affect a wide variety of plants, including trees, shrubs, and houseplants. Some species-specific leaf spots are more severe, requiring targeted fungicide treatments.'
},
{
    name: 'Root Rot',
    description: 'Root rot is caused by various fungi and affects the roots of plants, leading to wilting and yellowing of leaves.',
    solution: 'Improve drainage, avoid overwatering, and use fungicides if necessary.',
    imageUrl: 'https://gardenerspath.com/wp-content/uploads/2019/08/How-to-Manage-Root-Rot-in-Fruit-Nut-and-Landscape-Trees-FB.jpg',
    details: 'Root rot is often seen in poorly drained soils and can affect a wide range of plants. Early diagnosis and improving soil drainage are crucial for control. This disease can be particularly devastating as it may go unnoticed until the plant is severely affected. Root rot can be prevented by ensuring plants are not overwatered and that soil is well-aerated.'
},
{
    name: 'Rust',
    description: 'Rust is a fungal disease that causes reddish, orange, or brown pustules on leaves and stems.',
    solution: 'Remove affected leaves, avoid wetting foliage, and use fungicides.',
    imageUrl: 'https://cdn.britannica.com/06/128606-050-34D3D9C8/Soybean-rust.jpg',
    details: 'Rust fungi are obligate parasites, meaning they require a living host to complete their life cycle. Regular inspection and early intervention can help manage rust infections. Rust can affect a wide range of plants, including ornamentals, grains, and vegetables. Effective control often involves removing infected plant parts and maintaining good plant hygiene.'
},
{
    name: 'Anthracnose',
    description: 'Anthracnose causes dark lesions on leaves, stems, flowers, and fruits, often leading to defoliation.',
    solution: 'Remove affected parts, avoid overhead watering, and apply fungicides.',
    imageUrl: 'https://images1.farms.com/farms-production-images/Portals/0/anthracnose-300-1_1.png',
    details: 'Anthracnose is a group of fungal diseases that can affect various plant parts. Maintaining proper watering practices and removing infected plant material can help control its spread. The disease often thrives in humid conditions and can significantly impact fruit and vegetable crops if not managed properly.'
},
{
    name: 'Verticillium Wilt',
    description: 'Verticillium wilt causes wilting and yellowing of leaves, often in a one-sided pattern.',
    solution: 'Remove and destroy affected plants, improve soil drainage, and rotate crops.',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/10/2022/03/2048X1365-Verticillium-Wilt-SEO-GettyImages-1290967505-cf880c3.jpg?quality=90&resize=940,627',
    details: 'Verticillium wilt is caused by soil-borne fungi that infect the vascular system of plants. Crop rotation and soil improvement are essential for managing this disease. The fungus can persist in the soil for years, making it crucial to implement long-term management strategies to prevent recurrence.'
},
{
    name: 'Downy Mildew',
    description: 'Downy mildew is characterized by yellowish patches on leaves, with a downy growth on the undersides.',
    solution: 'Improve air circulation, water plants at the base, and use fungicides.',
    imageUrl: 'https://morningchores.com/wp-content/uploads/2019/09/Downy-Mildew-Identification-Plants-at-Risk-Prevention-and-Treatment-FI.jpg',
    details: 'Downy mildew thrives in cool, moist conditions. Ensuring good air circulation and avoiding overhead watering can help prevent this disease. It often affects a variety of crops, including grapes, cucumbers, and lettuce, and can spread quickly if conditions are favorable.'
},
{
    name: 'Bacterial Spot',
    description: 'Bacterial spot causes water-soaked lesions on leaves, fruits, and stems.',
    solution: 'Use disease-free seeds, avoid overhead watering, and use copper-based bactericides.',
    imageUrl: 'https://content.ces.ncsu.edu/media/images/Geranium_BLS_Xanth_img-0189_0002_27481.jpg',
    details: 'Bacterial spot is often spread through infected seeds or contaminated tools. Proper sanitation and using resistant varieties can help control its spread. The disease can significantly affect the quality of fruits and vegetables, making early detection and management essential.'
},
{
    name: 'Crown Rot',
    description: 'Crown rot affects the base of the stem near the soil line, leading to a soft, rotting area.',
    solution: 'Ensure proper drainage, avoid overwatering, and use fungicides if necessary.',
    imageUrl: 'https://www.planetnatural.com/wp-content/uploads/2023/08/Root-rot-in-lemon-tree.jpg',
    details: 'Crown rot is typically caused by soil-borne fungi and can be exacerbated by poor drainage. Improving soil conditions and avoiding excessive watering can help manage this issue. This disease can lead to severe plant decline if not addressed promptly, affecting various crops and ornamental plants.'
},
{
    name: 'Leaf Curl',
    description: 'Leaf curl causes leaves to curl, thicken, and turn red or yellow. It is found in most plants.',
    solution: 'Remove affected leaves, apply fungicides, and avoid planting susceptible varieties.',
    imageUrl: 'https://positivebloom.com/wp-content/uploads/2022/12/Why-Your-Lemon-Tree-Leaves-Curling-And-How-To-Fix-Them.jpg',
    details: 'Leaf curl can be caused by various factors including viruses, fungi, or environmental stress. Proper plant selection and maintenance are key to managing this disease. The disease can affect a range of plants, including fruit trees and ornamental plants, often requiring specific treatments depending on the cause.'
},
{
    name: 'Mosaic Virus',
    description: 'Mosaic virus causes mottled patterns of light and dark green on the leaves, sometimes with stunted growth.',
    solution: 'Remove and destroy infected plants, control insect vectors, and use resistant varieties.',
    imageUrl: 'https://extension.umd.edu/sites/extension.umd.edu/files/styles/optimized/public/2021-03/HGIC_flowers_cucumbermosaicsymptoms_16x9.jpg?itok=SwKoOA8W',
    details: 'Mosaic virus is often transmitted by insect vectors such as aphids. Using virus-free seeds and controlling insect populations can help reduce the incidence of this disease. The virus can cause significant damage to crops like cucumbers and tomatoes, making early management and resistant varieties essential.'
},
{
    name: 'Botrytis Blight',
    description: 'Botrytis blight, also known as gray mold, affects flowers, leaves, and stems, causing gray fuzzy mold.',
    solution: 'Improve air circulation, avoid overhead watering, and use fungicides.',
    imageUrl: 'https://extension.umd.edu/sites/extension.umd.edu/files/styles/optimized/public/2021-03/hgic_houseplant_botrytis_blight_on_begonia--0052-061-slide.jpg?itok=HW99cvf5',
    details: 'Botrytis blight thrives in high humidity and poor air circulation. Ensuring good ventilation and proper watering practices are essential for managing this disease. It can affect a variety of plants, including ornamental flowers and vegetables, often requiring targeted treatments for effective control.'
},
  {
    name: 'Black Spot',
    description: 'Black spot is a fungal disease that causes black spots on leaves, leading to yellowing and leaf drop.',
    solution: 'Remove infected leaves, avoid water on foliage, and use fungicides.',
    imageUrl: 'https://t3.ftcdn.net/jpg/05/79/16/94/240_F_579169484_Oa1f2OOO0XYLpgjNPOeAVoZgu9WUaz7M.jpg',
    details: 'Black spot is a common issue in roses and can spread rapidly. Regularly removing infected leaves and maintaining dry foliage can help control the disease.'
  },
  {
    name: 'Fusarium Wilt',
    description: 'Fusarium wilt is a soil-borne fungal disease that causes yellowing and wilting of leaves, often resulting in plant death.',
    solution: 'Use resistant plant varieties, rotate crops, and improve soil drainage.',
    imageUrl: 'https://www.almanac.com/sites/default/files/images/fusarium%20wilt%20tomatoes-AmBNPHOTO-SS.jpeg',
    details: 'Fusarium wilt can persist in the soil for many years. Using resistant plant varieties and practicing crop rotation are key strategies for managing this disease.'
  },
  {
    name: 'Early Blight',
    description: 'Early blight causes dark, concentric spots on older leaves and can lead to significant defoliation.',
    solution: 'Use disease-free seeds, practice crop rotation, and apply fungicides as needed.',
    imageUrl: 'https://www.cabidigitallibrary.org/cms/10.1079/cabicompendium.4528/asset/281fdde0-f68d-4f8e-906b-a65d362fe910/assets/graphic/4528_03.jpg',
    details: 'Early blight often affects tomatoes and potatoes. Proper crop rotation and removal of infected plant material can help reduce the incidence of this disease.'
  },
  {
    name: 'Late Blight',
    description: 'Late blight causes dark, water-soaked lesions on leaves, stems, and fruits, often leading to rapid plant collapse.',
    solution: 'Remove and destroy infected plants, avoid overhead watering, and use fungicides.',
    imageUrl: 'https://cropaia.com/wp-content/uploads/Potato-blight-phytophthora-infestans.jpg',
    details: 'Late blight is known for its rapid spread and severe impact on tomatoes and potatoes. Early detection and removal of infected plants are critical to managing this disease.'
  },
  {
    name: 'Scab',
    description: 'Scab causes rough, corky spots on fruits and tubers, affecting the quality and marketability of the produce.',
    solution: 'Use resistant varieties, avoid planting in infected soil, and maintain proper soil pH.',
    imageUrl: 'https://cdn.britannica.com/01/256101-050-2A574220/plant-coffee-leaf-rust-Heredia.jpg',
    details: 'Scab is common in apples, pears, and potatoes. Maintaining proper soil conditions and using resistant varieties can help minimize scab damage.'
  },
  {
    name: 'Phytophthora Root Rot',
    description: 'Phytophthora root rot is a disease caused by water molds, leading to rotting of roots and plant decline.',
    solution: 'Improve soil drainage, avoid waterlogging, and use fungicides if necessary.',
    imageUrl: 'https://www.canr.msu.edu/contentAsset/image/4bd99fbe-3091-4d1c-b761-63934dc4a3c8/fileAsset/filter/Resize/resize_w/500',
    details: 'Phytophthora root rot is particularly problematic in poorly drained soils. Improving soil drainage and avoiding waterlogging are essential for managing this disease.'
  },

    {
      name: 'Septoria Leaf Spot',
      description: 'Septoria leaf spot is a fungal disease that causes small, dark spots on leaves, often surrounded by yellow halos.',
      solution: 'Remove and destroy affected leaves, avoid overhead watering, and apply fungicides.',
      imageUrl: 'https://www.greenlife.co.ke/wp-content/uploads/2022/04/septoria_leaf_spot_of_tomato.jpg',
      details: 'This disease commonly affects tomato plants but can also infect other plants in the Solanaceae family. It thrives in warm, humid conditions, spreading through water splashes and contaminated tools.'
    },
    {
      name: 'Sooty Mold',
      description: 'Sooty mold is a fungal disease that excreted by aphids and other pests, covering leaves with a black substance.',
      solution: 'Control the insect pests, wash off the mold with water, and ensure proper air circulation.',
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/9qZaFZkT2k6us4aCP7eyQJ-1200-80.jpg',
      details: 'While sooty mold itself does not infect plants, it can hinder photosynthesis by blocking sunlight, leading to reduced plant vigor.'
    },
    {
      name: 'Clubroot',
      description: 'Clubroot is a soil-borne disease affecting the roots of cruciferous plants, causing swelling and distortion, leading to stunted growth.',
      solution: 'Maintain proper soil pH, practice crop rotation, and remove infected plants.',
      imageUrl: 'https://ag.umass.edu/sites/ag.umass.edu/files/fact-sheets/images/broccoliclubroot1.mx_.jpg',
      details: 'The pathogen Plasmodiophora brassicae can survive in soil for many years. Liming the soil to raise pH levels can help in managing this disease.'
    },
    {
      name: 'Fire Blight',
      description: 'Fire blight is a bacterial disease that affects apple and pear trees, causing wilting and blackening of blossoms, leaves, and shoots.',
      solution: 'Prune affected areas, avoid high nitrogen fertilization, and use bactericides if necessary.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Apple_tree_with_fire_blight.jpg',
      details: 'Fire blight is highly contagious and can spread rapidly in warm, wet conditions. It is important to disinfect pruning tools between cuts to prevent spreading the bacteria.'
    },
    {
      name: 'White Rust',
      description: 'White rust is a fungal disease that causes white pustules on the undersides of leaves, leading to chlorosis and defoliation.',
      solution: 'Remove infected plant parts, improve air circulation, and use fungicides.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mustard-_White_rust.jpg/1536px-Mustard-_White_rust.jpg',
      details: 'White rust primarily affects plants in the Brassicaceae family. The disease can overwinter in plant debris and spreads through water splashes.'
    },
    {
      name: 'Black Rot',
      description: 'Black rot affects grapevines, causing black lesions on leaves, stems, and fruit, leading to shriveled and blackened grapes.',
      solution: 'Prune and destroy infected plant parts, avoid wetting foliage, and apply fungicides.',
      imageUrl: 'https://www.shutterstock.com/image-photo/close-on-bacterial-leaf-black-600nw-2217220659.jpg',
      details: 'Caused by the fungus Guignardia bidwellii, black rot is a major disease of grapevines. It can spread rapidly in warm, humid conditions.'
    },
    {
      name: 'Cercospora Leaf Spot',
      description: 'Cercospora leaf spot causes small, round, tan to gray spots on leaves, often surrounded by a purple or red border.',
      solution: 'Remove and destroy affected leaves, avoid overhead watering, and use fungicides.',
      imageUrl: 'https://www.nurserymag.com/fileuploads/publications/16/issues/103553/articles/images/cercospora-leaf-spot-hydrangea-penn-st-web.jpg',
      details: 'Cercospora leaf spot affects a wide range of plants, including vegetables, ornamentals, and trees. The fungus thrives in warm, wet conditions.'
    },
    {
      name: 'Downy Spot',
      description: 'Downy spot affects the leaves of pecan trees, causing white, downy patches on the undersides of leaves.',
      solution: 'Remove infected leaves, improve air circulation, and use fungicides.',
      imageUrl: 'https://c1.wallpaperflare.com/preview/625/951/718/tar-stain-disease-maple-tree-maple-tree-dry-nature.jpg',
      details: 'Downy spot, caused by the fungus Microsphaera alni, can lead to defoliation and reduced tree vigor if not managed properly.'
    },
    {
      name: 'Anthracnose Fruit Rot',
      description: 'Anthracnose fruit rot causes dark, sunken lesions on fruits, often leading to fruit rot and drop.',
      solution: 'Remove and destroy infected fruits, avoid wetting fruit, and use fungicides.',
      imageUrl: 'https://content.ces.ncsu.edu/media/images/CastleHayne4-29-2014_AFR_Cropped.jpg',
      details: 'This disease affects a wide range of fruits, including tomatoes, peppers, and grapes. It is caused by fungi in the Colletotrichum genus.'
    },
    {
      name: 'Verticillium Wilt',
      description: 'Verticillium wilt is a soil-borne fungal disease that causes wilting, yellowing, and premature leaf drop in a wide range of plants.',
      solution: 'Use resistant plant varieties, improve soil drainage, and rotate crops.',
      imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/10/2022/03/2048X1365-Verticillium-Wilt-SEO-GettyImages-1290967505-cf880c3.jpg?quality=90&resize=940,627',
      details: 'Verticillium wilt is caused by fungi in the Verticillium genus. It can persist in soil for many years and affects many plant species, including trees, shrubs, and vegetables.'
    },
    {
      name: 'Phytophthora Blight',
      description: 'Phytophthora blight is a disease that affects a wide range of plants, causing water-soaked lesions on leaves, stems, and fruit.',
      solution: 'Improve drainage, avoid waterlogged conditions, and use fungicides.',
      imageUrl: 'https://cropaia.com/wp-content/uploads/Potato-blight-phytophthora-infestans.jpg',
      details: 'Caused by Phytophthora species, this disease thrives in wet conditions. It is particularly damaging to peppers, cucurbits, and ornamentals.'
    },
    {
      name: 'Bacterial Wilt',
      description: 'Bacterial wilt is a disease that causes wilting and death of plants. It often affects cucurbits, such as cucumbers and melons.',
      solution: 'Remove and destroy infected plants, use resistant varieties, and control insect vectors.',
      imageUrl: 'https://cropwatch.unl.edu/images/hero/2018/cowpea-wilt-BHarveson.jpg',
      details: 'Bacterial wilt is caused by Erwinia tracheiphila. The bacteria are spread by cucumber beetles, which transmit the pathogen while feeding.'
    },
    {
      name: 'Botryosphaeria Canker',
      description: 'Botryosphaeria canker affects woody plants, causing sunken, dark cankers on branches and stems, leading to dieback.',
      solution: 'Prune and destroy infected branches, avoid stress to plants, and use fungicides.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6aAB-FzNF-I5najhEu8SfZRe-gVLsIyp8yg&s',
      details: 'This canker disease is caused by fungi in the Botryosphaeria genus. It often affects stressed or weakened plants, including fruit trees and ornamental shrubs.'
    },
    {
      name: 'Canker',
      description: 'Cankers are caused by various pathogens and can appear as dead areas on stems often leading to death of parts above the infection.',
      solution: 'Remove and destroy infected plant parts, improve plant health, and apply appropriate treatments.',
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/59cbf998197aeaead99e3780/1561409803950-T00CU87SYLIE0QLTP1FO/Bacterial+canker.jpg?format=750w',
      details: 'Cankers can be caused by fungi, bacteria, or viruses. They are often more severe on stressed plants and can lead to significant damage if not managed.'
    },
    {
      name: 'Corn Smut',
      description: 'Corn smut is a fungal disease that causes large, tumor-like galls on corn ears, leaves, and stalks.',
      solution: 'Remove and destroy infected plants, rotate crops, and use resistant varieties.',
      imageUrl: 'https://cdn.britannica.com/14/122514-050-89F32E5F/Corn-smut.jpg',
      details: 'Corn smut, caused by the fungus Ustilago maydis, is most recognizable by the large, silvery galls it forms. While considered a disease, the galls are edible and a delicacy in some cultures.'
    },
    {
      name: 'Damping-Off',
      description: 'Damping-off is a disease that affects seedlings, causing them to rot at the soil line and collapse.',
      solution: 'Ensure good soil drainage, avoid overcrowding, and use fungicide-treated seeds.',
      imageUrl: 'https://rocketgardenshelp.zendesk.com/hc/article_attachments/4415721469585/damping-off.jpg',
      details: 'Damping-off is caused by several soil-borne fungi, including Pythium, Rhizoctonia, and Fusarium. It is a common problem in seedling production and can be minimized with proper sanitation and care.'
    },
  
      {
        name: 'Ergot',
        description: 'Ergot is a fungal disease that infects grasses and cereals, replacing grains with hard, dark sclerotia that are toxic.',
        solution: 'Remove and destroy infected plants, rotate crops, and use resistant varieties.',
        imageUrl: 'https://ars.els-cdn.com/content/image/3-s2.0-B978012378612800175X-f00175-05-9780123786128.jpg',
        details: 'Ergot is caused by fungi in the genus Claviceps. The sclerotia contain toxic alkaloids, which can cause ergotism in humans and animals if consumed.'
      },
      {
        name: 'Galls',
        description: 'Galls are abnormal growths on plants caused by insects, mites, nematodes, fungi, bacteria, or viruses.',
        solution: 'Identify and manage the causal agent, remove and destroy affected plant parts, and maintain plant health.',
        imageUrl: 'https://www.thespruce.com/thmb/_ZLPZu43CST2Pn1dyf0nFuQpS-U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dealing-with-leaf-galls-1402697-01-70649ad0fad746df9bdb661a3218e3de.jpg',
        details: 'Galls can vary widely in appearance and can be found on leaves, stems, and roots. They often do not harm the plant, but severe infestations can affect plant health.'
      },
      {
        name: 'Late Blight',
        description: 'Late blight affects tomatoes and potatoes, causing dark, water-soaked lesions on leaves, stems, and fruits.',
        solution: 'Remove and destroy infected plants, avoid wetting foliage, and use fungicides.',
        imageUrl: 'https://img.freepik.com/premium-photo/potato-late-blight-potato-disease-pest-problem-potato-cultivation-concept_561246-1285.jpg',
        details: 'Caused by the oomycete Phytophthora infestans, late blight can spread rapidly in cool, moist conditions. It was a major factor in the Irish Potato Famine.'
      },
      {
        name: 'Mosaic Virus',
        description: 'Mosaic virus causes mottled patterns of light and dark green on leaves, stunting, and leaf curling.',
        solution: 'Remove infected plants, control insect vectors, and use virus-free seeds.',
        imageUrl: 'https://www.planetnatural.com/wp-content/uploads/2021/11/Rose-Mosaic-Virus-scaled.jpg',
        details: 'There are many types of mosaic viruses, affecting a wide range of plants including vegetables, flowers, and ornamentals. They are often spread by aphids and other insect vectors.'
      },
      {
        name: 'Nematodes',
        description: 'Nematodes are microscopic worms that feed on plant roots, causing root galls, stunted growth, and yellowing.',
        solution: 'Use nematode-resistant varieties, rotate crops, and improve soil health.',
        imageUrl: 'https://entnemdept.ufl.edu/Creatures/NEMATODE/Figure_1_Rice_root_galls.jpg',
        details: 'Plant-parasitic nematodes can cause significant yield losses. Root-knot nematodes are among the most common and damaging types.'
      },
      {
        name: 'Phytophthora Root Rot',
        description: 'Phytophthora root rot causes browning and rotting of roots, leading to wilting and death of the plant.',
        solution: 'Improve soil drainage, avoid overwatering, and use resistant varieties.',
        imageUrl: 'https://www.thompson-morgan.com/static-images/master/static-images/diseases/phytophthora-root-rot/TM-Dec19-diseases-phytophthora-root-rot-what-is.jpg',
        details: 'This disease is caused by various species of Phytophthora, a water mold. It thrives in poorly drained, waterlogged soils and can affect a wide range of plants.'
      },
      {
        name: 'Phyllosticta Leaf Spot',
        description: 'Phyllosticta leaf spot causes round, dark lesions on leaves, often with a yellow halo.',
        solution: 'Remove affected leaves, ensure proper spacing, and apply fungicides if necessary.',
        imageUrl: 'https://plantpath.ifas.ufl.edu/u-scout/blog/ewExternalFiles/image-26.png',
        details: 'The disease is caused by fungi in the Phyllosticta genus. It affects many ornamental plants, trees, and shrubs, especially in humid conditions.'
      },
      {
        name: 'Powdery Scab',
        description: 'Powdery scab affects potato tubers, causing scab-like lesions and distortions.',
        solution: 'Use certified seed, rotate crops, and manage soil moisture.',
        imageUrl: 'https://www.agrifarming.in/wp-content/uploads/2022/10/How-to-Get-Rid-of-Potato-Scab-3-1024x680.jpg',
        details: 'Caused by the fungus Spongospora subterranea, powdery scab not only affects potato tubers but also serves as a vector for the transmission of potato mop-top virus.'
      },
      {
        name: 'Pythium Blight',
        description: 'Pythium blight causes water-soaked, greasy patches on grass, often leading to die-off.',
        solution: 'Improve drainage, avoid excessive watering, and apply fungicides.',
        imageUrl: 'https://sodsolutions.com/wp-content/uploads/2022/04/Pythium-Blight.jpg',
        details: 'Commonly affects turfgrass, especially in warm, wet conditions. Pythium blight can spread quickly, resulting in significant damage to lawns and sports fields.'
      },
      {
        name: 'Rhizoctonia Solani',
        description: 'Rhizoctonia solani causes damping-off in seedlings, root rot, and stem cankers.',
        solution: 'Improve soil drainage, avoid overcrowding, and use fungicides.',
        imageUrl: 'https://www.pthorticulture.com/sites/ptgc_pro/files/styles/desktop_1920w/public/2024-03/promix_greenhouse_growing_rhizoctonia_stem-rot-in-poinsettia%201.jpg?itok=XONh3VnS',
        details: 'Rhizoctonia solani is a soil-borne fungus that affects a wide range of crops. It can cause pre- and post-emergence damping-off, reducing seedling establishment.'
      },
      {
        name: 'Sclerotinia Stem Rot',
        description: 'Sclerotinia stem rot, also known as white mold, causes white, fluffy growth on stems, leading to wilting.',
        solution: 'Remove affected plants, rotate crops, and use fungicides and provide better maintenence.',
        imageUrl: 'https://www.canolacouncil.org/wp-content/uploads/2020/08/sclerotinia-stem-rot-cover-photo-min-600x400.jpg',
        details: 'Caused by the fungus Sclerotinia sclerotiorum, this disease affects a wide range of crops including beans, peas, and sunflowers. It thrives in cool, moist environments.'
      },
      {
        name: 'Septoria Leaf Spot',
        description: 'Septoria leaf spot causes small, circular spots on leaves, often with a dark border.',
        solution: 'Remove affected leaves, avoid overhead watering, and apply fungicides.',
        imageUrl: 'https://www.greenlife.co.ke/wp-content/uploads/2022/04/septoria_leaf_spot_of_tomato.jpg',
        details: 'The disease is common in tomato plants but can affect other crops. It is caused by the fungus Septoria lycopersici and spreads in wet conditions.'
      },
      {
        name: 'Snow Mold',
        description: 'Snow mold is a fungal disease that appears as matted, moldy patches on grass after snow melts.',
        solution: 'Rake affected areas, improve air circulation, and avoid excessive nitrogen fertilization in late fall.',
        imageUrl: 'https://media.istockphoto.com/id/1271735032/photo/under-the-name-of-snow-mold-there-are-two-diseases-of-the-lawn-occurring-in-winter-and-spring.jpg?s=612x612&w=0&k=20&c=V58gW624LMV-N5L_dGyBzCMVNweVKjXdgU-wSwYVLuM=',
        details: 'There are two types of snow mold: gray and pink. Both thrive under snow cover, but pink snow mold is more severe and can infect crowns and roots.'
      },
      {
        name: 'Southern Blight',
        description: 'Southern blight affects a wide range of plants, causing white fungal growth and sclerotia at the base of stems.',
        solution: 'Remove affected plants, avoid planting susceptible species, and use fungicides.',
        imageUrl: 'https://extension.umd.edu/sites/extension.umd.edu/files/styles/optimized/public/2021-03/HGIC_flowers_southernblight_delphinium_CC.jpg?itok=wXXfclBv',
        details: 'Caused by the fungus Sclerotium rolfsii, southern blight is particularly prevalent in warm, humid climates. The disease can quickly girdle stems, leading to plant death.'
      },
      {
        name: 'Verticillium Wilt',
        description: 'Verticillium wilt causes wilting, yellowing, and browning of leaves, often with one side of the plant affected more.',
        solution: 'Remove and destroy affected plants, rotate crops, and use resistant varieties.',
        imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/10/2022/03/2048X1365-Verticillium-Wilt-SEO-GettyImages-1290967505-cf880c3.jpg?quality=90&resize=940,627',
        details: 'Verticillium wilt is caused by soil-borne fungi in the genus Verticillium. It can persist in soil for many years and affects a wide range of plants, including trees and shrubs.'
      },
      {
        name: 'Tomato Yellow Leaf Curl Virus',
        description: 'This virus causes yellowing and curling of leaves, stunted growth, and reduced fruit production in tomatoes.',
        solution: 'Control whitefly vectors, use resistant varieties, and apply insecticides as needed.',
        imageUrl: 'https://www.agric.wa.gov.au/sites/gateway/files/TYLCV%20leaflet%20cropped.jpg',
        details: 'Tomato yellow leaf curl virus is transmitted by whiteflies and is a major problem in tropical and subtropical regions. It can cause significant yield losses in affected crops.'
      },
      {
        name: 'Fire Blight',
        description: 'Fire blight is a bacterial disease that affects apples, pears, and other plants, causing blackened, wilted leaves and branches.',
        solution: 'Prune affected branches, disinfect tools, and apply appropriate bactericides.',
        imageUrl: 'https://extension.unh.edu/sites/default/files/migrated_unmanaged_files/fb3.png',
        details: 'Caused by the bacterium Erwinia amylovora, fire blight spreads through rain, wind, and insects. It is most severe in warm, wet weather.'
      },
      {
        name: 'Fusarium Wilt',
        description: 'Fusarium wilt causes yellowing, wilting, and eventual death of plants, with dark streaks in the vascular tissue.',
        solution: 'Use resistant varieties, rotate crops, and improve soil drainage.',
        imageUrl: 'https://www.planetnatural.com/wp-content/uploads/2012/12/fusarium-wilt-tomato.jpg',
        details: 'Caused by Fusarium oxysporum, this disease affects many crops including tomatoes, bananas, and cotton. It is soil-borne and can be difficult to manage once established.'
      },
      {
        name: 'Clubroot',
        description: 'Clubroot affects brassica plants, causing swollen, distorted roots and stunted growth.',
        solution: 'Adjust soil pH, practice crop rotation, and use resistant varieties.',
        imageUrl: 'https://ag.umass.edu/sites/ag.umass.edu/files/fact-sheets/images/broccoliclubroot1.mx_.jpg',
        details: 'Clubroot is caused by the soil-borne pathogen Plasmodiophora brassicae. It is most severe in acidic soils and can persist for many years.'
      },
      {
        name: 'Scab',
        description: 'Scab is a fungal disease that causes rough, corky spots on fruits, particularly apples and pears.',
        solution: 'Use resistant varieties, remove affected fruits, and apply fungicides.',
        imageUrl: 'https://media.istockphoto.com/id/1339270414/photo/scab-on-the-leaves-of-an-apple-tree-close-up.jpg?s=612x612&w=0&k=20&c=z4XRGi3_b50fcnAza_66-O1kpEVzdV0M5Zh5c8sHbJ4=',
        details: 'Apple scab, caused by the fungus Venturia inaequalis, is a common disease in temperate regions. It affects both leaves and fruit, reducing yield and quality.'
      },
      {
        name: 'Blackleg',
        description: 'Blackleg affects the stems of brassica plants, causing black lesions and decay at the base of the stem.',
        solution: 'Use disease-free seeds, rotate crops, and apply fungicides as necessary.',
        imageUrl: 'https://ausveg.com.au/app/uploads/2019/05/blackleg-web.jpg',
        details: 'Blackleg, caused by the bacteria Leptosphaeria maculans and L. biglobosa, can be spread through infected seeds and plant debris. It is a major concern in canola and other brassica crops.'
      },
      {
        name: 'Pythium Root Rot',
        description: 'Pythium root rot causes root decay, yellowing, and wilting, particularly in waterlogged soils.',
        solution: 'Improve soil drainage, avoid overwatering, and use fungicides if necessary.',
        imageUrl: 'https://www.canr.msu.edu/pestid/uploads/images/Hosta-plant-with-rotted-root-system.jpg',
        details: 'Pythium species are water molds that thrive in wet conditions. Pythium root rot can affect a wide range of plants, particularly in greenhouse and nursery settings.'
      },
      {
        name: 'Angular Leaf Spot',
        description: 'Angular leaf spot causes angular, water-soaked lesions on leaves, often with a yellow halo.',
        solution: 'Use disease-free seeds, avoid overhead watering, and apply copper-based bactericides.',
        imageUrl: 'https://ephytia.inra.fr/en/I/41686/Angular-leaf-zimbabwe2',
        details: 'Angular leaf spot is caused by the bacteria Xanthomonas campestris. It is commonly found in cucurbit crops such as cucumbers and melons, and can be spread by rain and irrigation.'
      },
      {
        name: 'Pink Root',
        description: 'Pink root affects onions and garlic, causing roots to turn pink and rot, leading to stunted growth.',
        solution: 'Rotate crops, use resistant varieties, and improve soil conditions.',
        imageUrl: 'https://extension.usu.edu/planthealth/ipm/images/agricultural/vegetables/pink-root-2.jpg',
        details: 'Pink root is caused by the fungus Phoma terrestris. It is most severe in warm, sandy soils and can significantly reduce bulb size and quality.'
      },
      {
        name: 'Bacterial Wilt',
        description: 'Bacterial wilt causes wilting and yellowing of leaves, often leading to rapid plant death.',
        solution: 'Control insect vectors, use resistant varieties, and avoid working with wet plants.',
        imageUrl: 'https://www.cabidigitallibrary.org/cms/10.1079/cabicompendium.45009/asset/f48ddcc0-5010-45e4-93bc-0fe5c590efad/assets/graphic/msiri01.jpg',
        details: 'Bacterial wilt is caused by the bacterium Ralstonia solanacearum. It affects a wide range of plants, including tomatoes, potatoes, and bananas. It is spread through soil, water, and infected plant material.'
      }
    ];

    

    
    
    const Solution = ({ theme }) => {
      
      const [filteredDiseases, setFilteredDiseases] = useState(plantDiseases);
      const [currentPage, setCurrentPage] = useState(1);
      const [openDialog, setOpenDialog] = useState(false);
      const [selectedDisease, setSelectedDisease] = useState(null);
      const diseasesPerPage = 15;
      const totalPages = Math.ceil(plantDiseases.length / diseasesPerPage);
      const location = useLocation();
    
      useEffect(() => {
        const query = new URLSearchParams(location.search);
        const searchQuery = query.get('search')?.toLowerCase() || '';
        if (searchQuery) {
          setFilteredDiseases(
            plantDiseases.filter(disease =>
              disease.name.toLowerCase().includes(searchQuery)
            )
          );
          setCurrentPage(1); // Reset to first page on new search
        } else {
          setFilteredDiseases(plantDiseases);
        }
      }, [location.search]);
    
      const handleExpandClick = (disease) => {
        setSelectedDisease(disease);
        setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDisease(null);
      };
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const indexOfLastDisease = currentPage * diseasesPerPage;
      const indexOfFirstDisease = indexOfLastDisease - diseasesPerPage;
      const currentDiseases = filteredDiseases.slice(indexOfFirstDisease, indexOfLastDisease);
    
      const cardBackgroundColor = theme === 'light' ? '#ffffff' : '#000000';
      const cardContentColor = theme === 'light' ? '#000000' : '#ffffff';
    
      return (
        <div style={{
          padding: 20,
          backgroundImage: 'url("/path/to/your/background-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}>
          <Typography variant="h5" component="h2" gutterBottom style={{ color: theme === 'light' ? '#000000' : '#ffffff', fontWeight: "bold" }}>
            More Plant Diseases and Solutions:
          </Typography>
          <br />
          <Grid container spacing={5}>
            {currentDiseases.map((disease, index) => (
              <Grid item xs={11} md={4} key={index}>
                <Card
                  style={{
                    backgroundColor: cardBackgroundColor,
                    color: cardContentColor,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: '0.3s',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <CardMedia
                    component="img"
                    height="230"
                    image={disease.imageUrl}
                    alt={disease.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {disease.name}
                      <Tooltip title={disease.details}>
                        <IconButton size="small" sx={{ marginLeft: 1, color: theme === 'light' ? '#000000' : '#ffffff' }}>
                          <Info />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                      {disease.description}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                      <strong>Solution:</strong> {disease.solution}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      size="small"
                      onClick={() => handleExpandClick(disease)}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
    
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ margin: '0 10px', color: cardContentColor }}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{
                  margin: '0 5px',
                  fontWeight: currentPage === pageNumber ? 'bold' : 'normal',
                  color: cardContentColor,
                }}
              >
                {pageNumber}
              </Button>
            ))}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ margin: '0 10px', color: cardContentColor }}
            >
              Next
            </Button>
          </div>
    
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            PaperProps={{
              style: {
                backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
                color: theme === 'light' ? '#000000' : '#ffffff',
              },
            }}
          >
            <DialogTitle style={{ borderBottom: `1px solid ${theme === 'light' ? '#000000' : '#ffffff'} `}}>
              {selectedDisease?.name}
            </DialogTitle>
            <DialogContent dividers>
              <Typography paragraph style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                {selectedDisease?.details}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    };
    
    export default Solution;