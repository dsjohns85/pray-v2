// Ten Commandments with Four-Stranded Garland
// Based on Martin Luther's "A Simple Way to Pray" (1535)
// Luther's method: Instruction, Thanksgiving, Confession, Prayer

export const commandments = [
    {
        id: 1,
        type: 'commandment',
        title: 'The First Commandment',
        commandmentText: 'You shall have no other gods',
        garland: {
            instruction: `First, I learn from this commandment what the Lord God demands of me: that I must place all my trust and confidence in him alone and in no one else. I should expect every good thing from him more than from all creatures, and believe with certainty that he desires to help me in every need. This is what he earnestly commands: that I look to him alone for every good thing, cling to him only, and turn to him with all my heart.`,
            thanksgiving: `Second, I give thanks for his infinite compassion by which he has come to me in such a fatherly way and, unasked, unbidden, and unmerited, has offered to be my God, to care for me, and to be my comfort, guardian, help, and strength in every time of need. We poor creatures have wandered about trying to find help and consolation in all creatures, and we have still not found it. But here is the One who will help us, and he offers his services gladly and generously.`,
            confession: `Third, I confess and acknowledge my great sin and wicked ingratitude that I have not believed this all my life, and have not trusted, relied upon, or clung to this truth. Instead, I have allowed my heart to be frightened and driven away from such promises. I have sought help and comfort in other gods, and looked for counsel and help from myself and from other people. I have not honored him as my God.`,
            prayer: `Fourth, I pray that he would grant me his grace and help me to recognize and overcome this lack of faith and mistrust, and to learn this commandment well. Grant that I may keep it in my heart and never forget it. Give me his good Spirit that I may cling to him with true trust and confidence, seek all good things from him, turn to him in every need, and remain constant and steadfast in this faith until death. Amen.`
        }
    },
    {
        id: 2,
        type: 'commandment',
        title: 'The Second Commandment',
        commandmentText: 'You shall not take the name of the Lord your God in vain',
        garland: {
            instruction: `I learn here that I should not swear, curse, practice magic, lie, or deceive by God's name, but call upon it in every trouble, pray, praise, and give thanks. This means that I should use God's holy name only to the glory of God and the benefit of my neighbor and myself. No one should use God's name to support lies or any wrong, no matter how important the cause, but use it only to give praise and thanks to God.`,
            thanksgiving: `I thank him that he has given me his holy, precious, and awesome name, by which he has sealed me to himself and made me his child. I praise his mercy that he allows me to call upon his name and that he has promised to hear me and help me in all my distresses. I thank him that he has not left me like the heathen to seek help from helpless creatures and false gods.`,
            confession: `I confess that I have terribly sinned against this commandment all my life. I have not only failed to call upon, praise, and thank his holy name, but have also been ungrateful for such gifts. Moreover, I have burdened his name with lies and shame, have sworn both in matters of business and in idle chatter. I have taken his holy name in vain countless times. I have not helped to keep it holy as I should have done.`,
            prayer: `I pray that he would forgive my sins and help me henceforth to learn this commandment and to guard myself against such abuse of his name. Grant that I may keep his name holy and not forget it in times of trouble but call upon it, and comfort myself with it, knowing that I will be heard. Thus I will praise and thank him all my life for his kindness and for the precious gift of his holy name. Amen.`
        }
    },
    {
        id: 3,
        type: 'commandment',
        title: 'The Third Commandment',
        commandmentText: 'Remember the Sabbath day, to keep it holy',
        garland: {
            instruction: `I learn from this commandment that I should esteem God's word above all things, diligently learn it, listen to it gladly, honor and keep it holy. I should not despise preaching and God's word because of tedious or lazy disrespect, but willingly hear and learn it with all earnestness and attention. God commands this and will call us to account for it.`,
            thanksgiving: `I give thanks for his great and beautiful mercy in that he has given us his precious word. He did not leave us in darkness and error like the heathen and unbelievers, but has revealed to us his mind and will and the way to heaven through his dear Son. He has commanded this word to be proclaimed and taught, and has given us the sabbath day that we may have time to attend to it so that we may especially learn, hear, and keep what leads to eternal life.`,
            confession: `I confess that I have shamefully despised such precious gifts throughout my entire life. I have been too lazy, bored, and uninterested in learning God's word. I have not valued preaching highly, and have often been careless and ungrateful. I have let God's precious seed fall on the pathway or among the thorns, and have not brought forth fruit.`,
            prayer: `I pray that he would graciously forgive my sins and grant me his Spirit to love and value his word more highly from now on. Help me gladly to hear it, learn it, and keep it in my heart, that thereby I may be strengthened in faith, in love, and in patience. Grant that I may persevere in all tribulation and overcome the devil, the world, and my own flesh. Amen.`
        }
    },
    {
        id: 4,
        type: 'commandment',
        title: 'The Fourth Commandment',
        commandmentText: 'Honor your father and your mother',
        garland: {
            instruction: `I learn that, next to God, I should honor my father and mother and all who are in authority over me. I should obey them, serve them, help them, respect and esteem them, and do everything I can to assist them. I should hold them in high regard regardless of whether they are rich or poor, wise or simple. God does not look at a person's outward appearance or status but at the heart and this commandment.`,
            thanksgiving: `I thank God for his inexpressible goodness in having established and blessed this estate. He himself takes the place of our parents and those in authority, commits his name to them, and calls himself our Father. He promises to nourish, protect, and preserve us. This is a great and excellent gift. Therefore I thank God that he has given me godly and faithful parents and rulers, and that he has preserved me under them.`,
            confession: `I confess that I have not kept this commandment. I have not honored my parents, nor have I obeyed them. I have often provoked them to anger by my words and actions. I have been impatient with their weakness and have not helped and served them as I should. I have despised good government, have been rebellious and insubordinate, and have not earnestly prayed for those in authority as God commands.`,
            prayer: `I pray that he would forgive such disobedience and grant me grace henceforth to serve, obey, and honor my parents and all in authority over me. Give me understanding to recognize this estate as a divine ordinance and command. Help me to think of it as a precious treasure and a sanctuary such as we all should love and value with all our hearts. Grant that I may conduct myself in all humility and patience toward them. Amen.`
        }
    },
    {
        id: 5,
        type: 'commandment',
        title: 'The Fifth Commandment',
        commandmentText: 'You shall not murder',
        garland: {
            instruction: `I learn that I should not harm my neighbor in any way, either in thought or word or deed, whether by hand or through someone else. I should not be hostile or bear any grudge against anyone, regardless of what injury or injustice I have suffered. Rather, I should be kind and good to everyone, even to my enemies, and help them in all their bodily needs, including food, shelter, and safety.`,
            thanksgiving: `I thank God for his command and his fatherly will which is intended for the good of all humankind. If this commandment were kept, there would be no war, no bloodshed, no murder, no cruelty or torture. I thank God that he has protected me from murderers and from shedding innocent blood, and that he has given me this instruction so that I may guard myself against it and not permit the devil to incite me to such terrible sin.`,
            confession: `I confess that I have not kept this commandment. I have been angry with my neighbor, harbored hatred and envy in my heart, and spoken evil of others. I have wished evil upon those who have harmed me. I have not helped my neighbor in bodily need as I should. I have not loved my neighbor as myself, nor have I done to others as I would have them do to me.`,
            prayer: `I pray that he would protect me from the murderer and from the devil who is a murderer from the beginning. Preserve me from a sudden, evil death. Give me a kind heart toward all people, that I may harbor no anger, hatred, or ill will toward anyone. Help me to be patient with others' weaknesses and faults, as you are patient with mine. Grant that I may help everyone in their need and danger, and never bring harm to any person. Amen.`
        }
    },
    {
        id: 6,
        type: 'commandment',
        title: 'The Sixth Commandment',
        commandmentText: 'You shall not commit adultery',
        garland: {
            instruction: `I learn that God forbids all unchastity and desires me to be pure and holy in thought, word, and deed. I should love and honor my spouse, and we should live together in harmony and love. If I am unmarried, I should live in purity and modesty until God gives me a spouse. I should help and honor others in their marriage and support this estate which God has established.`,
            thanksgiving: `I thank God that he has established the estate of marriage as a blessed and holy ordinance. In this estate he brings man and woman together, and blesses them to be fruitful and care for their children in the fear of the Lord. I thank God for protecting marriage and for punishing adultery and unchastity. I praise him that he has preserved me from such shame and disgrace and kept me in purity.`,
            confession: `I confess that I have not remained pure and holy in this matter as I should. I have had impure thoughts and have not always governed my eyes, my heart, and my body as is proper before God. I have not honored the estate of marriage as I ought. I have been immodest in my conduct and have not fled from temptation as Joseph did. I have sinned against my spouse or against my future spouse by my impurity.`,
            prayer: `I pray that God would give me his grace to live in purity and honor, to govern my heart and body in holiness. Protect me from the devil and the temptations of my own flesh. Help married people to live together in true love and faithfulness. Bless those who are unmarried with self-control and purity until you give them a spouse. Guard us all against adultery and every kind of unchastity. Amen.`
        }
    },
    {
        id: 7,
        type: 'commandment',
        title: 'The Seventh Commandment',
        commandmentText: 'You shall not steal',
        garland: {
            instruction: `I learn that I should not take my neighbor's property or obtain it by dishonest means, but should help them improve and protect their income and property. I should earn my own living by honest work and not be lazy or seek to get rich by dishonest means. I should be content with what God gives me and trust him to provide for my needs. I should not desire more than I need but use what I have to help others in their need.`,
            thanksgiving: `I thank God that he has given this commandment to protect our temporal goods and has promised to provide for our needs. He guards what belongs to each person and punishes thieves and robbers. I thank him for what he has given me and for protecting me from those who would take it from me. I praise him that he gives to all creatures what they need and provides for them daily.`,
            confession: `I confess that I have not been content with what God has given me but have desired what belongs to others. I have not always been diligent in my work but have been lazy and careless. I have not helped others improve and protect their property as I should. I have taken advantage of others in business dealings and have not been completely honest in all my affairs. I have not used what God gave me to help others in their need as generously as I should.`,
            prayer: `I pray that God would give me a heart content with what he provides and trust in his care. Help me to be diligent and faithful in my work, earning my living honestly. Give me integrity in all my dealings with others. Protect me from the temptation to steal or to obtain goods dishonestly. Make me generous toward those in need. Guard me against greed and the love of money. Grant that I may use all that you give me to your glory and for the good of others. Amen.`
        }
    },
    {
        id: 8,
        type: 'commandment',
        title: 'The Eighth Commandment',
        commandmentText: 'You shall not bear false witness against your neighbor',
        garland: {
            instruction: `I learn that I should not tell lies about my neighbor, betray, slander, or defame them, but should defend them, speak well of them, and explain everything in the kindest way. I should not judge others rashly or speak evil of them. Even if I see them sin or do wrong, I should cover it and forgive it, as I would want others to do for me. I should not gossip or spread rumors but should help preserve my neighbor's good name.`,
            thanksgiving: `I thank God for giving this commandment to protect our good name and reputation. He desires that each person's honor be kept safe from false accusation and slander. I praise him for protecting my reputation and for exposing lies and false witnesses. I thank him that he knows the truth about me even when others speak evil of me falsely.`,
            confession: `I confess that I have sinned greatly against this commandment. I have not defended my neighbor's reputation but have believed evil reports about them. I have spoken carelessly and spread gossip. I have judged others harshly and have not explained their actions in the kindest way. I have not covered their faults with love but have exposed them. I have damaged reputations by my words and have not helped restore those who have fallen.`,
            prayer: `I pray that God would put a guard over my mouth and keep watch over the door of my lips. Help me to speak only what is true, kind, and helpful. When I hear evil reports about others, give me wisdom to defend them or remain silent. Grant that I may judge others with mercy, as I hope to be judged. Help me to forgive as I have been forgiven. Preserve me from gossip and slander. Let my words build up and not tear down. Amen.`
        }
    },
    {
        id: 9,
        type: 'commandment',
        title: 'The Ninth Commandment',
        commandmentText: 'You shall not covet your neighbor\'s house',
        garland: {
            instruction: `I learn that I should not scheme to get my neighbor's inheritance or house under pretense of right, or obtain it by deception or trickery. I should not take advantage of the poor or helpless to get their property. I should help and serve my neighbors so that they may keep what is theirs, just as I would want others to do for me. I should not desire what belongs to another but should be content with what God has given me.`,
            thanksgiving: `I thank God that he looks at the heart and not merely at outward actions. He forbids not only the act of stealing but even the desire to have what belongs to another. I praise him for his perfect law that governs both action and desire. I thank him for what he has given me and for teaching me to be content with my portion. He knows what I need and provides it in his wisdom.`,
            confession: `I confess that my heart has not been content with what God has given me. I have looked at what others have with envy and have schemed how I might obtain it. I have been discontent with my house, my possessions, and my circumstances. I have not rejoiced in what God has given to others but have been jealous of their prosperity. My heart has not been pure in this matter, even when my actions appeared proper.`,
            prayer: `I pray that God would give me a heart that is content and grateful for what he provides. Help me to rejoice when others prosper and not to envy them. Guard my heart from covetousness and the desire for what belongs to others. Teach me to seek first your kingdom and righteousness, trusting that you will provide all I need. Give me generous hands and a grateful heart. Make me quick to help others keep what is theirs. Amen.`
        }
    },
    {
        id: 10,
        type: 'commandment',
        title: 'The Tenth Commandment',
        commandmentText: 'You shall not covet your neighbor\'s wife, or his manservant, or his maidservant, or his cattle, or anything that is your neighbor\'s',
        garland: {
            instruction: `I learn that I should not estrange, force, or entice away from my neighbor anyone who works for them or serves them, but should encourage such people to remain faithful and do what they ought to do. I should not desire to have my neighbor's workers, animals, or any possessions. I should be content with my own household and possessions, and should help my neighbor keep their household and servants content and faithful.`,
            thanksgiving: `I thank God for his thoroughness in teaching me his will. He forbids not only taking what belongs to another but even desiring it in my heart. I praise him for teaching me to be content with what I have and to rejoice in what he has given to others. I thank him for faithful workers and for all who serve. I praise him that he provides for all my needs according to his riches in glory.`,
            confession: `I confess that I have coveted what belongs to others. I have looked with envy at their servants, their prosperity, their animals, and their possessions. I have desired to have what they have rather than being content with what God has given me. I have not been a good master or employer, and I have not helped my neighbor keep their household content and faithful. My heart has been full of selfish desire rather than contentment and gratitude.`,
            prayer: `I pray that God would root out all covetousness from my heart and give me true contentment. Help me to be grateful for everything you have given me and to use it faithfully. Give me a heart that rejoices when others prosper. Make me a good master or employer if you have given me workers to supervise. Help me not to entice anyone away from faithful service to their employer. Guard my heart from jealousy and selfish ambition. Teach me to seek your kingdom first, trusting that all these things will be added to me. Amen.`
        }
    }
];
