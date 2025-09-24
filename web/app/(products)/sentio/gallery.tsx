'use client'

import { useState, useMemo, useRef, useEffect, memo } from 'react';
import { useTranslations } from 'next-intl';
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Image,
    Tabs,
    Tab,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Switch,
    Select,
    SelectItem,
    Link,
    useDraggable,
    addToast
} from "@heroui/react";
import { useSentioBackgroundStore, useSentioCharacterStore, useSentioAgentStore, useSentioTtsStore} from '@/lib/store/sentio';
import { 
    BACKGROUND_TYPE, 
    ResourceModel, 
    CHARACTER_TYPE, 
    RESOURCE_TYPE
} from '@/lib/protocol';
import { BUSINESS_COOPERATION_URL } from '@/lib/constants';
import * as CONSTANTS from '@/lib/constants';
import { getSrcPath } from '@/lib/path';
import { useLive2D } from './hooks/live2d';
import clsx from 'clsx';


interface ResourceModelExtend extends ResourceModel {
    sub_type: BACKGROUND_TYPE | CHARACTER_TYPE
}

function ImagesList({  
    current,  
    descs,  
    enable,  
    showType,  
    choiceFunc,  
    showPresetIndicator = false,
    onApplyPreset 
}: {  
    current: ResourceModel | null,  
    descs: ResourceModelExtend[],  
    enable: boolean,  
    showType: BACKGROUND_TYPE | CHARACTER_TYPE,  
    choiceFunc: (index: number | null, shouldExecute?: boolean) => void,  
    showPresetIndicator?: boolean,
    onApplyPreset?: (name: string) => void  
}) {  
    const allTypes = [BACKGROUND_TYPE.ALL, CHARACTER_TYPE.ALL];  
    return (  
        <div className="gap-6 grid grid-cols-2 sm:grid-cols-4 max-h-96">  
            {enable && descs.map((item, index) => (  
                (item.sub_type == showType || allTypes.includes(showType)) && <Card  
                    shadow="md"  
                    key={index}  
                    isPressable  
                    onPress={() => choiceFunc(index, true)}  
                    className={clsx(  
                        "text-small justify-between h-fit relative",  
                        {  
                            'text-blue-600 border-2 border-indigo-600': !!current && item.resource_id == current.resource_id,  
                        }  
                    )}  
                >  
                    <CardBody className="overflow-visible p-0">  
                        {/* 预设指示器 */}  
                        {showPresetIndicator && CONSTANTS.CHARACTER_PRESETS[item.name] && (  
                            <div className="absolute top-2 right-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full">  
                                预设  
                            </div>  
                        )}  
                          
                        {/* 现有的图片/视频显示代码保持不变 */}  
                        {  
                            item.link.endsWith('.mp4') ?  
                            <video   
                                className='w-full object-cover h-[120px]'   
                                autoPlay   
                                muted   
                                loop  
                                poster={getSrcPath('image/loading.png')}  
                                src={item.link}  
                                style={{ pointerEvents: 'none' }}  
                            />  
                            :  
                            <Image  
                                shadow="sm"  
                                radius="lg"  
                                width="100%"  
                                alt={item.name}  
                                className="w-full object-cover h-[120px]"  
                                src={item.link}  
                                isZoomed={true}  
                                style={{ objectFit: "cover" }}  
                            />  
                        }  
                    </CardBody>  
                    <CardFooter className="text-small justify-between">  
                        <b>{item.name}</b>  
                        {showPresetIndicator && CONSTANTS.CHARACTER_PRESETS[item.name] && (  
                            <Button   
                                size="sm"   
                                color="success"   
                                variant="shadow"  
                                startContent={<span className="mr-1.5 animate-pulse">✨</span>}  // 用符号替代图标  
                                className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white font-semibold px-4 py-2 
                                            rounded-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 
                                            hover:from-emerald-500 hover:to-cyan-600 transition-all duration-300 
                                            transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 
                                            focus:ring-emerald-400 focus:ring-offset-2"  
                                onPress={() => {  
                                    onApplyPreset && onApplyPreset(item.name);  
                                    choiceFunc(index, false);  
                                }}  
                                >  
                                灵伴快搭  
                            </Button>  
                        )}  
                    </CardFooter>  
                </Card>  
            ))}  
        </div>  
    )  
}

function BackgroundsTab() {
    const t = useTranslations('Products.sentio.gallery.backgrounds');
    const { background, setBackground } = useSentioBackgroundStore();
    const [enable, setEnable] = useState<boolean>(background != null);
    const [bgType, setBgType] = useState<string>(t('all'));
    // bgType映射关系
    const bgTypeMap = {
        [t('all')]: BACKGROUND_TYPE.ALL,
        [t('static')]: BACKGROUND_TYPE.STATIC,
        [t('dynamic')]: BACKGROUND_TYPE.DYNAMIC,
    };
    const getBackgrounds = (type: BACKGROUND_TYPE): ResourceModelExtend[] => {
        var backgrounds: ResourceModelExtend[] = [];
        // 静态图 / 动态图 处理
        const images = type == BACKGROUND_TYPE.STATIC ? CONSTANTS.SENTIO_BACKGROUND_STATIC_IMAGES : CONSTANTS.SENTIO_BACKGROUND_DYNAMIC_IMAGES;
        const imagePath = type == BACKGROUND_TYPE.STATIC ? CONSTANTS.SENTIO_BACKGROUND_STATIC_PATH : CONSTANTS.SENTIO_BACKGROUND_DYNAMIC_PATH;

        for (const image of images) {
            // 文件名字
            const name = image.split('.')[0];
            backgrounds.push({
                resource_id: `${type}_${image}`,
                type: RESOURCE_TYPE.BACKGROUND,
                sub_type: type,
                name: name,
                link: getSrcPath(`${imagePath}/${image}`),
            });
        }
        return backgrounds;
    }

    const staticBackgrounds = useMemo(() => getBackgrounds(BACKGROUND_TYPE.STATIC), []);
    const dynamicBackgrounds = useMemo(() => getBackgrounds(BACKGROUND_TYPE.DYNAMIC), []);
    const backgrounds = [...staticBackgrounds, ...dynamicBackgrounds];
    // 背景选择触发函数
    const choiceBackground = (index: number | null) => {
        if (index != null) {
            setBackground(backgrounds[index]);
        } else {
            setBackground(null);
        }
    }

    const onEnableChange = (isSelected: boolean) => {
        setEnable(isSelected);
        if (!isSelected) {
            choiceBackground(null);
        }
    }

    return (
        <Card>
            <CardBody>
                <div className='flex flex-col gap-4 max-h-96 overflow-y-auto'>
                    <Switch defaultSelected={background != null} color="primary" onValueChange={onEnableChange}>{t('enable')}</Switch>
                    <Divider />
                    {
                        enable && <div className='flex flex-row items-center gap-2'>
                            <Select
                                className="max-w-md"
                                name="bgTypeSelect"
                                label={t('select')}
                                key={t('select')}
                                defaultSelectedKeys={[bgType as string]}
                                onSelectionChange={(e) => setBgType(e.currentKey as string)}
                            >
                                {
                                    Object.keys(bgTypeMap).map((key) => (
                                        <SelectItem key={key}>{key}</SelectItem>
                                    ))
                                }
                            </Select>
                        </div>
                    }
                    <ImagesList
                        current={background}
                        descs={backgrounds}
                        enable={enable}
                        showType={bgTypeMap[bgType]}
                        choiceFunc={choiceBackground}
                    />                    
                </div>
            </CardBody>
        </Card>
    )
}

function CharactersTab() {
    const t = useTranslations('Products.sentio.gallery.characters');
    const { character, setCharacter } = useSentioCharacterStore();
    const [characterType, setCharacterType] = useState<string>(t('all'));
    const { setLive2dCharacter } = useLive2D();    
    const { setBackground } = useSentioBackgroundStore();  
    const { setEngine: setAgentEngine, setSettings: setAgentSettings } = useSentioAgentStore();  
    const { setEngine: setTtsEngine, setSettings: setTtsSettings } = useSentioTtsStore();   
    // 映射关系
    const characterTypeMap = {
        [t('all')]: CHARACTER_TYPE.ALL,
        [t('ip')]: CHARACTER_TYPE.IP,
        [t('free')]: CHARACTER_TYPE.FREE,
    };

    const applyCharacterPreset = (characterName: string) => {  
        const preset = CONSTANTS.CHARACTER_PRESETS[characterName];  
        if (!preset) {  
            console.warn(`No preset found for character: ${characterName}`);  
            return;  
        }  
  
        // 设置背景  
        const backgroundResource: ResourceModelExtend = {  
            resource_id: `${preset.backgroundType}_${preset.background}`,  
            type: RESOURCE_TYPE.BACKGROUND,  
            sub_type: preset.backgroundType === 'static' ? BACKGROUND_TYPE.STATIC : BACKGROUND_TYPE.DYNAMIC,  
            name: preset.background.split('.')[0],  
            link: getSrcPath(`${preset.backgroundType === 'static' ? CONSTANTS.SENTIO_BACKGROUND_STATIC_PATH : CONSTANTS.SENTIO_BACKGROUND_DYNAMIC_PATH}/${preset.background}`),  
        };  
        setBackground(backgroundResource);  
  
    const characterResource = characters.find(char => char.name === preset.character);  
    if (characterResource) {  
        setCharacter(characterResource);  
        setLive2dCharacter(characterResource);  
    }
    
        // 设置Dify智能体  
        setAgentEngine('Dify');  
        setAgentSettings(preset.difyAgent);  
  
        // 设置TTS配置  
        setTtsEngine('Dify');  
        setTtsSettings(preset.ttsConfig);  
  
        // 显示成功提示  
        addToast({  
            title: '角色预设应用成功',  
            description: `已为 ${characterName} 应用预设配置`, 
            color: 'success',
            variant: 'flat'
        });  
    };  
  
    const getCharacters = (type: CHARACTER_TYPE): ResourceModelExtend[] => {
        var characters: ResourceModelExtend[] = [];
        // 静态图 / 动态图 处理
        const models = type == CHARACTER_TYPE.FREE ? CONSTANTS.SENTIO_CHARACTER_FREE_MODELS : CONSTANTS.SENTIO_CHARACTER_IP_MODELS;
        const modelPath = type == CHARACTER_TYPE.FREE ? CONSTANTS.SENTIO_CHARACTER_FREE_PATH : CONSTANTS.SENTIO_CHARACTER_IP_PATH;
        for (const model of models) {
            characters.push({
                resource_id: `${type}_${model}`,
                name: model,
                sub_type: type,
                link: getSrcPath(`${modelPath}/${model}/${model}.png`),
                type: RESOURCE_TYPE.CHARACTER
            });
        }
        return characters;
    }

    const freeCharacters = useMemo(() => getCharacters(CHARACTER_TYPE.FREE), [])
    const ipCharacters = useMemo(() => getCharacters(CHARACTER_TYPE.IP), []);
    const characters = [...freeCharacters, ...ipCharacters];

    const choiceCharacter = (index: number | null, shouldExecute = true) => {
        if (!shouldExecute) return;
        
        if (index != null) {
            if (character.name == characters[index].name && character.resource_id == characters[index].resource_id) return;
            setCharacter(characters[index]);
            setLive2dCharacter(characters[index]);
        } else {
            setCharacter(null);
        }
    }


    return (
        <Card>
            <CardBody>
                <div className='flex flex-col gap-4 max-h-96 overflow-y-auto'>
                    <div className='flex flex-row items-center gap-2'>
                        <Select
                            className="max-w-md"
                            name="characterTypeSelect"
                            label={t('select')}
                            key={t('select')}
                            defaultSelectedKeys={[characterType as string]}
                            onSelectionChange={(e) => setCharacterType(e.currentKey as string)}
                        >
                            {
                                Object.keys(characterTypeMap).map((key) => (
                                    <SelectItem key={key}>{key}</SelectItem>
                                ))
                            }
                        </Select>
                    </div>

                    <Link className='hover:underline text-sm w-fit ml-2' href={BUSINESS_COOPERATION_URL} color='warning' isExternal>👉 定制人物模型</Link>
                    <ImagesList  
                        current={character}  
                        descs={characters}  
                        enable={true}  
                        showType={characterTypeMap[characterType]}  
                        choiceFunc={choiceCharacter}  
                        showPresetIndicator={true}  
                        onApplyPreset={applyCharacterPreset}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

function GalleryTabs() {
    const t = useTranslations('Products.sentio.gallery');
    return (
        <Tabs aria-label="Gallery">
            <Tab key='characters' title={t('characters.title')}>
                <CharactersTab />
            </Tab>
            <Tab key='backgrounds' title={t('backgrounds.title')}>
                <BackgroundsTab />
            </Tab>
        </Tabs>
    )
}

export function Gallery({ isOpen: open, onClose }: { isOpen: boolean, onClose: () => void }) {
    const t_common = useTranslations('Common');
    const t = useTranslations('Products.sentio.gallery');
    const { isOpen, onOpen, onOpenChange } = useDisclosure({ isOpen: open, onClose });
    const targetRef = useRef(null);
    const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
    return (
        <Modal
            ref={targetRef}
            isOpen={open}
            onOpenChange={onOpenChange}
            size="5xl"
            placement="center"
            scrollBehavior="outside"
        >
            <ModalContent>
                <ModalHeader {...moveProps} className="flex flex-col gap-1">{t('title')}</ModalHeader>
                <ModalBody>
                    <GalleryTabs />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        {t_common('close')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}